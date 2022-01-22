import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Module({
  providers: [
    {
      provide: 'UserRepository',
      useClass: UserRepository,
    },
  ],
  exports: [
    {
      provide: 'UserRepository',
      useClass: UserRepository,
    },
  ],
})
export class UserModule {}
