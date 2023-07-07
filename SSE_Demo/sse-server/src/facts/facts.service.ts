import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NextFunction, Request, Response } from 'express';
import { Clients } from 'src/clients/clients.entity';
import { ClientsService } from 'src/clients/clients.service';
import { Facts } from 'src/facts/facts.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FactsService {
  constructor(
    private readonly clientService: ClientsService,

    @InjectRepository(Facts)
    private factRepository: Repository<Facts>,
  ) {}
  async eventsHandler(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    const headers = {
      'Content-Type': 'text/event-stream',
      Connection: 'keep-alive',
      'Cache-Control': 'no-cache',
    };
    res.writeHead(200, headers);
    const facts = await this.factRepository.find();
    const data = `data: ${JSON.stringify(facts)}\n\n`;

    res.write(data);

    const clientId = Date.now();

    const newClient = {
      id: clientId,
      res: res,
    };
    // newly connected client to server
    const client = this.clientService.createClient(newClient);
    console.log('client', client);
    // clients list connected to server
    const clients = this.clientService.getAllClients();
    console.log('clients', clients);

    req.on('close', async () => {
      console.log(`${clientId} Connection closed`);
      await this.clientService.deleteClient(clientId);
      //   clients = clients.filter((client: any) => client.id !== clientId);
    });
  }
  async sendEventsToAll(newFact: any) {
    const clients = await this.clientService.getAllClients();
    clients.forEach((client: any) =>
      client.res.write(`data: ${JSON.stringify(newFact)}\n\n`),
    );
  }

  async addFact(req: Request, res: Response, next: NextFunction) {
    const newFact = req.body;
    const fact = this.factRepository.create(newFact);
    await this.factRepository.save(fact);
    // facts.push(newFact);
    res.json(newFact);
    return this.sendEventsToAll(newFact);
  }
}
