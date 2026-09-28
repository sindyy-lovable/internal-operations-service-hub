import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'node:path';
import { HealthController } from './health.controller';
import { LifecycleModule } from './lifecycle/lifecycle.module';
import { AiIntakeModule } from './ai-intake/ai-intake.module';
import {
  ServiceRequestEntity,
  RequestHistoryEntryEntity,
} from './lifecycle/lifecycle.entities';

const entities = [ServiceRequestEntity, RequestHistoryEntryEntity];

@Module({
  controllers: [HealthController],
  imports: [
    ServeStaticModule.forRoot({
  rootPath: join(__dirname, 'frontend'),
}),
    TypeOrmModule.forRoot(
      process.env.DATABASE_URL
        ? {
            type: 'postgres',
            url: process.env.DATABASE_URL,
            entities,
            synchronize: true,
            logging: false,
          }
        : {
            type: 'sqlite',
            database: 'data/service-hub.sqlite',
            entities,
            synchronize: true,
            logging: false,
          },
    ),
    LifecycleModule,
    AiIntakeModule,
  ],
})
export class AppModule {}