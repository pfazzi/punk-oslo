import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { HealthCheckController } from './health-check.controller';
import { Clock } from './clock';
import { UserRepository } from './user.repository';

@Module({
  imports: [],
  controllers: [UserController, HealthCheckController],
  providers: [Clock, UserRepository],
})
export class AppModule {}
