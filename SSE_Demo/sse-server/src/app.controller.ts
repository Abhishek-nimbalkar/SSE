import { Controller, Get, Next, Post, Req, Res } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AppService } from './app.service';

@Controller('/')
export class AppController {
  private clients: any[] = [];
  private facts: any[] = [];
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getStatus(): any {
    return this.appService.getStatus();
  }
}
