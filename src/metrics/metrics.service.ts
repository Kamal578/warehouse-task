import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Counter, register } from 'prom-client';

@Injectable()
export class MetricsService implements OnApplicationBootstrap {
  requestCounter: Counter<string>;

  constructor() {
    this.requestCounter = new Counter({
      name: 'http_requests_total',
      help: 'Total number of HTTP requests',
      labelNames: ['method', 'route', 'status'],
    });
  }

  onApplicationBootstrap() {
    register.registerMetric(this.requestCounter);
  }

  incrementRequestCounter(method: string, route: string, status: string) {
    this.requestCounter.labels(method, route, status).inc();
  }

  getMetrics() {
    return register.metrics();
  }

  resetMetrics() {
    register.resetMetrics();
  }

  getMetricsAsArray() {
    return register.getMetricsAsArray();
  }

  getContentType() {
    return register.contentType;
  }
}
