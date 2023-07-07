import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clients } from './clients.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Clients)
    private clientRepository: Repository<Clients>,
  ) {}
  getStatusOfClient(): Promise<Clients[]> {
    return this.clientRepository.find();
    // return res.json({ clients: clients.length });
  }
  async createClient(newClient: any): Promise<any> {
    const client = this.clientRepository.create(newClient);
    return await this.clientRepository.save(client);
  }
  async getAllClients(): Promise<any> {
    return await this.clientRepository.find();
  }
  async deleteClient(clientId: any): Promise<any> {
    return await this.clientRepository.delete(clientId);
  }
}
