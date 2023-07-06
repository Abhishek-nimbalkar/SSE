import { Injectable } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AppService {
  getStatus(): any {
    return { status: 200, message: 'Ok' };
  }
  getStatusOfClient(req: Request, res: Response, clients: any): any {
    res.json({ clients: clients.length });
  }
  eventsHandler(req, res, next, clients, facts): any {
    const headers = {
      'Content-Type': 'text/event-stream',
      Connection: 'keep-alive',
      'Cache-Control': 'no-cache',
    };
    res.writeHead(200, headers);

    const data = `data: ${JSON.stringify(facts)}\n\n`;

    res.write(data);

    const clientId = Date.now();

    const newClient = {
      id: clientId,
      res,
    };

    clients.push(newClient);

    req.on('close', () => {
      console.log(`${clientId} Connection closed`);
      clients = clients.filter((client: any) => client.id !== clientId);
    });
  }
  sendEventsToAll(newFact: any, clients: any) {
    clients.forEach((client: any) =>
      client.res.write(`data: ${JSON.stringify(newFact)}\n\n`),
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
    res.json(newFact);
    return this.sendEventsToAll(newFact, clients);
  }
}
