import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LifecycleModule } from './lifecycle/lifecycle.module';
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
  ],
})
export class AppModule {}
