import { Controller, Get, Inject } from '@nestjs/common';
import { ClockInterface } from './clock.interface';

@Controller('health-check')
export class HealthCheckController {
  constructor(@Inject('Clock') private readonly clock: ClockInterface) {}

  @Get()
  timestamp(): Date {
    return this.clock.now();
  }
}
