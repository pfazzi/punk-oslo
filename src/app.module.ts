import { Module } from '@nestjs/common';
import { RestModule } from './ui/rest/rest.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/infrastructure/user.module';

@Module({
  imports: [
    RestModule,
    MongooseModule.forRoot('mongodb://localhost:27017/punk-olso'),
    UserModule,
  ],
})
export class AppModule {}
