import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule } from 'src/clients/clients.module';
import { FactsController } from './facts.controller';
import { Facts } from './facts.entity';
import { FactsService } from './facts.service';

@Module({
  imports: [ClientsModule, TypeOrmModule.forFeature([Facts])],
  controllers: [FactsController],
  providers: [FactsService],
})
export class FactsModule {}
