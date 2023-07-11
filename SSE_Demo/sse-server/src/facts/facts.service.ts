import { Injectable } from '@nestjs/common';
import { Facts } from './facts.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';

@Injectable()
export class FactsService {
  constructor(
    @InjectRepository(Facts)
    private factRepository: Repository<Facts>,
  ) {}

  async findAllFacts(): Promise<Facts[]> {
    return this.factRepository.find();
  }

  async getRecordCount(): Promise<any> {
    // console.log('this.userRepostory :>> ', await this.factRepository.count({}));
    return await this.factRepository.count({});
  }

  async getLastRecords(n: any): Promise<Facts[]> {
    const latestPosts = await this.factRepository.find({
      order: {
        createdOn: 'DESC',
      },
      take: n,
    });
    return latestPosts;
  }

  async addFact(fact: string): Promise<Facts> {
    const newFact = new Facts();
    newFact.id = Math.ceil(Math.random() * 100);
    newFact.fact = fact;
    return await this.factRepository.save(newFact);
  }
}
