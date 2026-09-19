import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LifecycleModule } from './lifecycle/lifecycle.module';
import { AiIntakeModule } from './ai-intake/ai-intake.module';
import { ServiceRequestEntity, RequestHistoryEntryEntity } from './lifecycle/lifecycle.entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data/service-hub.sqlite',
      entities: [ServiceRequestEntity, RequestHistoryEntryEntity],
      synchronize: true,
      logging: false,
    }),
    LifecycleModule,
    AiIntakeModule,
  ],
})
export class AppModule {}
