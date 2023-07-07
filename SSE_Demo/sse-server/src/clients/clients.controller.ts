import { Controller, Get } from '@nestjs/common';
import { Clients } from './clients.entity';
import { ClientsService } from './clients.service';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientService: ClientsService) {}

  @Get('status')
  getStatusOfClients(): Promise<Clients[]> {
    return this.clientService.getStatusOfClient();
  }
}
