import { ClockInterface } from './clock.interface';

export class SystemClock implements ClockInterface {
  now(): Date {
    return new Date();
  }
}
