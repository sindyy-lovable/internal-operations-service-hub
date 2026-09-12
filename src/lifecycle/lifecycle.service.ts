import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { isValidTransition } from './transition-policy';
import {
  RequestHistoryEntry,
  RequestStatus,
  ServiceRequest,
} from './lifecycle.types';

@Injectable()
export class LifecycleService {
  private readonly requests = new Map<string, ServiceRequest>();

  createRequest(description: string): ServiceRequest {
    const requestId = randomUUID();
    const historyEntry = this.createHistoryEntry(
      requestId,
      null,
      RequestStatus.SUBMITTED,
    );
    const request: ServiceRequest = {
      id: requestId,
      description,
      status: RequestStatus.SUBMITTED,
      history: [historyEntry],
    };

    this.requests.set(requestId, request);
    return this.snapshot(request);
  }

  getRequest(requestId: string): ServiceRequest {
    const request = this.requests.get(requestId);
    if (!request) {
      throw new NotFoundException(`Request ${requestId} was not found`);
    }

    return this.snapshot(request);
  }

  transition(requestId: string, nextStatus: RequestStatus, actor = 'IT', department = 'IT'): ServiceRequest {
    const request = this.requests.get(requestId);
    if (!request) {
      throw new NotFoundException(`Request ${requestId} was not found`);
    }

    if (actor !== 'IT' || department !== 'IT') {
      throw new ForbiddenException('only IT actors may transition this request');
    }

    if (!isValidTransition(request.status, nextStatus)) {
      throw new BadRequestException(
        `Invalid transition from ${request.status} to ${nextStatus}`,
      );
    }

    const historyEntry = this.createHistoryEntry(
      requestId,
      request.status,
      nextStatus,
    );
    request.status = nextStatus;
    request.history.push(historyEntry);

    return this.snapshot(request);
  }

  private createHistoryEntry(
    requestId: string,
    fromStatus: RequestStatus | null,
    toStatus: RequestStatus,
  ): RequestHistoryEntry {
    return {
      id: randomUUID(),
      requestId,
      fromStatus,
      toStatus,
      occurredAt: new Date().toISOString(),
    };
  }

  private snapshot(request: ServiceRequest): ServiceRequest {
    return {
      ...request,
      history: request.history.map((entry) => ({ ...entry })),
    };
  }
}
