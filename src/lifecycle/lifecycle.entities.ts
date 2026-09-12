import { Column, Entity, PrimaryColumn } from 'typeorm';
import { RequestStatus } from './lifecycle.types';

@Entity({ name: 'service_requests' })
export class ServiceRequestEntity {
  @PrimaryColumn('uuid')
  id!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({ type: 'varchar', length: 32 })
  status!: RequestStatus;
}

@Entity({ name: 'request_history' })
export class RequestHistoryEntryEntity {
  @PrimaryColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  requestId!: string;

  @Column({ type: 'varchar', nullable: true, length: 32 })
  fromStatus!: RequestStatus | null;

  @Column({ type: 'varchar', length: 32 })
  toStatus!: RequestStatus;

  @Column({ type: 'text' })
  occurredAt!: string;
}
