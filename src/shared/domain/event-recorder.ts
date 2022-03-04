import { DomainEvent } from './domain-event';

export class EventRecorder {
  private _events: DomainEvent<any>[] = [];

  protected recordThat(event: DomainEvent<any>): void {
    this._events.push(event);
  }

  public releaseEvents(): Array<DomainEvent<any>> {
    return this._events;
  }
}
