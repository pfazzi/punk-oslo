import { Clock } from '../domain/clock';

export class FakeClock implements Clock {
  constructor(private readonly date: Date) {}

  now(): Date {
    return this.date;
  }
}
