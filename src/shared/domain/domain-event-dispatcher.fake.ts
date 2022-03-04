import { DomainEventDispatcher } from './domain-event-dispatcher';
import { DomainEvent } from './domain-event';

export class FakeDomainEventDispatcher implements DomainEventDispatcher {
  public readonly events = [];

  dispatch(...events: DomainEvent<any>[]): void {
    this.events.push(...events);
  }
}
