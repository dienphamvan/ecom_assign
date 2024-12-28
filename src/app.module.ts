import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DynamodbService } from './dynamodb/dynamodb.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, DynamodbService],
})
export class AppModule {}
