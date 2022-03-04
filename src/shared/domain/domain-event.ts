export class DomainEvent<T> {
  constructor(public readonly entityId: string, public readonly payload: T) {}
}
