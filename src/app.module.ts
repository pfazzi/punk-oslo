import { Module } from '@nestjs/common';
import { RestModule } from './ui/rest/rest.module';

@Module({
  imports: [RestModule],
})
export class AppModule {}
