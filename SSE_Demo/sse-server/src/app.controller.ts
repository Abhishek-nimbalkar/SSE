import { Controller, Get, Next, Post, Req, Res } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AppService } from './app.service';

@Controller('/')
export class AppController {
  // private facts: any[] = [];
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getStatus(): any {
    return this.appService.getStatus();
  }
  @Get('status')
  getStatusOfClients(@Req() req: Request, @Res() res: Response): any {
    return this.appService.getStatusOfClient(req, res);
  }

  @Get('events')
  getEvents(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ): any {
    return this.appService.eventsHandler(req, res, next);
  }
}
