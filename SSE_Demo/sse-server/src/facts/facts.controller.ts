import { Controller, Post, Body } from '@nestjs/common';
import { FactsService } from './facts.service';
import { Facts } from './facts.entity';

@Controller('fact')
export class FactsController {
  constructor(private readonly factService: FactsService) {}
  @Post()
  addFact(@Body() fact: any): Promise<Facts> {
    // console.log('fact :>> ', fact.info);
    return this.factService.addFact(fact.info);
  }
}
