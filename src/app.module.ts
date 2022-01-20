import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { HealthCheckController } from './health-check.controller';
import { SystemClock } from './system-clock';
import { UserRepository } from './user.repository';

@Module({
  imports: [],
  controllers: [UserController, HealthCheckController],
  providers: [
    {
      provide: 'Clock',
      useClass: SystemClock,
    },
    UserRepository,
  ],
})
export class AppModule {}
