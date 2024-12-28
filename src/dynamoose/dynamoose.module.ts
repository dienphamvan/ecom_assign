import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as dynamoose from 'dynamoose';

@Global()
@Module({})
export class DynamooseModule {
  constructor(private config: ConfigService) {
    if (this.config.get('NODE_ENV') === 'local') {
      dynamoose.aws.ddb.local();
    } else {
      const ddb = new dynamoose.aws.ddb.DynamoDB({
        credentials: {
          accessKeyId: this.config.get('AWS_ACCESS_KEY_ID'),
          secretAccessKey: this.config.get('AWS_SECRET_ACCESS_KEY'),
        },
        region: this.config.get('AWS_REGION'),
      });

      dynamoose.aws.ddb.set(ddb);
    }
  }
}
