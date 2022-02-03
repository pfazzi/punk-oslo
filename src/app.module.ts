import { Module } from '@nestjs/common';
import { RestModule } from './ui/rest/rest.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AdminGuard } from './shared/guards/admin.guard';


@Module({
  imports: [
    RestModule,
    MongooseModule.forRoot('mongodb://localhost:27017/punk-olso'),
    UsersModule,
  ],
  providers: [AdminGuard]
})
export class AppModule { }
