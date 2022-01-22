import { Module } from '@nestjs/common';
import { HealthCheckController } from './health-check.controller';
import { UserController } from './user.controller';
import { SharedModule } from '../../shared/infrastructure/shared.module';
import { UserModule } from '../../user/infrastructure/user.module';

@Module({
  controllers: [HealthCheckController, UserController],
  imports: [SharedModule, UserModule],
})
export class RestModule {}
