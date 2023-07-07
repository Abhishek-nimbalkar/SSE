import { Controller, Get, Next, Post, Req, Res } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { FactsService } from './facts.service';
@Controller('/')
export class FactsController {
  constructor(private readonly factService: FactsService) {}
  @Get('events')
  getEvents(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ): any {
    return this.factService.eventsHandler(req, res, next);
  }
  @Post('fact')
  addFact(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ): any {
    this.factService.addFact(req, res, next);
  }
}
