import { DomainEvent } from './domain-event';

export class EventRecorder {
  private _events = [];

  protected recordThat(event: DomainEvent<any>): void {
    this._events.push(event);
  }

  public releaseEvents(): Array<DomainEvent<any>> {
    return this._events;
  }
}
