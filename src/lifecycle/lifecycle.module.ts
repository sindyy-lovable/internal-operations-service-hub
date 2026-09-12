import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LifecycleController } from './lifecycle.controller';
import { LifecycleService } from './lifecycle.service';
import { LifecycleRepository } from './lifecycle.repository';
import { ServiceRequestEntity, RequestHistoryEntryEntity } from './lifecycle.entities';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceRequestEntity, RequestHistoryEntryEntity])],
  controllers: [LifecycleController],
  providers: [LifecycleService, LifecycleRepository],
})
export class LifecycleModule {}
