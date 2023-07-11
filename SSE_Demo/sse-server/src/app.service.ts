import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { NextFunction, Request, Response } from 'express';
import { FactsService } from './facts/facts.service';

@Injectable()
export class AppService {
  private clients: any[] = [];
  private oldCount: number;
  constructor(private readonly factService: FactsService) {
    this.oldCount = 0;
  }

  getStatus(): any {
    return { status: 200, message: 'Ok' };
  }
  getStatusOfClient(req: Request, res: Response): any {
    res.json({ clients: this.clients.length });
  }
  async eventsHandler(req, res, next): Promise<any> {
    const headers = {
      'Content-Type': 'text/event-stream',
      Connection: 'keep-alive',
      'Cache-Control': 'no-cache',
    };
    res.writeHead(200, headers);
    const facts = await this.factService.findAllFacts();
    if (facts) {
      const data = `data: ${JSON.stringify(facts)}\n\n`;
      res.write(data);
    }

    const clientId = Date.now();

    const newClient = {
      id: clientId,
      res,
    };

    this.clients.push(newClient);

    req.on('close', () => {
      console.log(`${clientId} Connection closed`);
      this.clients = this.clients.filter(
        (client: any) => client.id !== clientId,
      );
    });
  }
  sendEventsToAll(newFact: any) {
    this.clients.forEach((client: any) =>
      newFact.forEach((fact: any) =>
        client.res.write(`data: ${JSON.stringify(fact)}\n\n`),
      ),
    );
  }

  async addFact(
    req: Request,
    res: Response,
    next: NextFunction,
    facts: any,
    clients: any,
  ) {
    const newFact = req.body;
    facts.push(newFact);
    return res.json(newFact);
    // return this.sendEventsToAll(newFact, clients);
  }

  @Cron('* * * * *')
  async sync() {
    const res = await this.factService.findAllFacts();
    const currCount = await this.factService.getRecordCount();
    if (currCount) {
      console.log('currCount :>> ', currCount);
      const diff: any = currCount - this.oldCount;
      console.log('diff :>> ', diff);
      if (diff != 0) {
        const lastRec = await this.factService.getLastRecords(diff);
        if (lastRec) {
          this.oldCount = currCount;
          console.log('lastRec :>> ', lastRec);
          this.sendEventsToAll(lastRec);
        }
      }
    }
    // console.log(res);
    console.log('Notificaiton Serverce have been tirggered.......');
  }
}
