import { Injectable } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AppService {
  getStatus(): any {
    return { status: 200, message: 'Ok' };
  }
}
