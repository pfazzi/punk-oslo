import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService as UsersService } from './users.service';
import { User, UserSchema } from './schemas/user.schema';
import { AdminUsersController } from './admin-users.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UsersController, AdminUsersController],
  providers: [UsersService],
})
export class UsersModule { }
