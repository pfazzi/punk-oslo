import { DomainEvent } from './domain-event';

export interface DomainEventDispatcher {
  dispatch(...events: DomainEvent<any>[]): void;
}
