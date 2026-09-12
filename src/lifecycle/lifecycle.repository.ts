import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { randomUUID } from 'node:crypto';
import { isValidTransition } from './transition-policy';
import { RequestHistoryEntry, RequestStatus, ServiceRequest } from './lifecycle.types';
import { RequestHistoryEntryEntity, ServiceRequestEntity } from './lifecycle.entities';

@Injectable()
export class LifecycleRepository {
  private readonly requests: Repository<ServiceRequestEntity>;
  private readonly history: Repository<RequestHistoryEntryEntity>;

  constructor(private readonly dataSource: DataSource) {
    this.requests = this.dataSource.getRepository(ServiceRequestEntity);
    this.history = this.dataSource.getRepository(RequestHistoryEntryEntity);
  }

  async createRequest(description: string): Promise<ServiceRequest> {
    const requestId = randomUUID();
    const request = this.requests.create({
      id: requestId,
      description,
      status: RequestStatus.SUBMITTED,
    });
    await this.requests.save(request);

    const historyEntry = this.createHistoryEntry(requestId, null, RequestStatus.SUBMITTED);
    await this.history.save(this.history.create(historyEntry));

    const saved = await this.requests.findOneBy({ id: requestId });
    if (!saved) {
      throw new NotFoundException(`Request ${requestId} was not found`);
    }

    return this.toDomain(saved);
  }

  async getRequest(requestId: string): Promise<ServiceRequest> {
    const request = await this.requests.findOneBy({ id: requestId });
    if (!request) {
      throw new NotFoundException(`Request ${requestId} was not found`);
    }

    return this.toDomain(request);
  }

  async transition(requestId: string, nextStatus: RequestStatus, actor: string, department: string): Promise<ServiceRequest> {
    if (actor !== 'IT' || department !== 'IT') {
      throw new BadRequestException('You are not permitted to transition this request');
    }

    const request = await this.requests.findOneBy({ id: requestId });
    if (!request) {
      throw new NotFoundException(`Request ${requestId} was not found`);
    }

    if (!isValidTransition(request.status as RequestStatus, nextStatus)) {
      throw new BadRequestException(
        `Invalid transition from ${request.status} to ${nextStatus}`,
      );
    }

    const historyEntry = this.createHistoryEntry(requestId, request.status as RequestStatus, nextStatus);
    request.status = nextStatus;
    await this.requests.save(request);
    await this.history.save(this.history.create(historyEntry));

    return this.toDomain(request);
  }

  private createHistoryEntry(requestId: string, fromStatus: RequestStatus | null, toStatus: RequestStatus): RequestHistoryEntry {
    return {
      id: randomUUID(),
      requestId,
      fromStatus,
      toStatus,
      occurredAt: new Date().toISOString(),
    };
  }

  private async getHistory(requestId: string): Promise<RequestHistoryEntry[]> {
    const entries = await this.history.find({ where: { requestId } });
    return entries.map((entry) => ({
      id: entry.id,
      requestId: entry.requestId,
      fromStatus: entry.fromStatus,
      toStatus: entry.toStatus,
      occurredAt: entry.occurredAt,
    }));
  }

  private async toDomain(request: ServiceRequestEntity): Promise<ServiceRequest> {
    const history = await this.getHistory(request.id);
    return {
      id: request.id,
      description: request.description,
      status: request.status,
      history,
    };
  }
}
