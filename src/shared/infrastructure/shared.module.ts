import { Module } from '@nestjs/common';
import { SystemClock } from './system-clock';
import { FakeDomainEventDispatcher } from '../domain/domain-event-dispatcher.fake';

@Module({
  providers: [
    {
      provide: 'Clock',
      useClass: SystemClock,
    },
    {
      provide: 'DomainEventDispatcher',
      useClass: FakeDomainEventDispatcher,
    },
  ],
  exports: [
    {
      provide: 'Clock',
      useClass: SystemClock,
    },
    {
      provide: 'DomainEventDispatcher',
      useClass: FakeDomainEventDispatcher,
    },
  ],
})
export class SharedModule {}
