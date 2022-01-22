import { Module } from '@nestjs/common';
import { SystemClock } from './system-clock';

@Module({
  providers: [
    {
      provide: 'Clock',
      useClass: SystemClock,
    },
  ],
  exports: [
    {
      provide: 'Clock',
      useClass: SystemClock,
    },
  ],
})
export class SharedModule {}
