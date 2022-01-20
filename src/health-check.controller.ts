import { Controller, Get } from '@nestjs/common';
import { Clock } from './clock';

@Controller('health-check')
export class HealthCheckController {
  constructor(private readonly clock: Clock) {}

  @Get()
  timestamp(): string {
    return this.clock.now().toISOString();
  }
}
