import { Controller, Get, Inject } from '@nestjs/common';
import { Clock } from '../../shared/domain/clock';

@Controller('health-check')
export class HealthCheckController {
  constructor(@Inject('Clock') private readonly clock: Clock) {}

  @Get()
  timestamp(): Date {
    return this.clock.now();
  }
}
