import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { SignUpHandler } from '../application/sign-up.handler';
import { DeleteHandler } from '../application/delete.handler';
import { SharedModule } from '../../shared/infrastructure/shared.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    SharedModule,
  ],
  providers: [
    {
      provide: 'UserRepository',
      useClass: UserRepository,
    },
    SignUpHandler,
    DeleteHandler,
  ],
  exports: [
    {
      provide: 'UserRepository',
      useClass: UserRepository,
    },
    SignUpHandler,
    DeleteHandler,
  ],
})
export class UserModule {}
