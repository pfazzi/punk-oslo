import { ClockInterface } from './clock.interface';

export class FakeClock implements ClockInterface {
  constructor(private readonly date: Date) {}

  now(): Date {
    return this.date;
  }
}
