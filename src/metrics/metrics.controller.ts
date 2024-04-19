import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { register } from 'prom-client';

@Controller('metrics')
export class MetricsController {
  @Get()
  getMetrics(@Res() res: Response) {
    res.set('Content-Type', register.contentType);
    res.end(register.metrics());
  }
}
