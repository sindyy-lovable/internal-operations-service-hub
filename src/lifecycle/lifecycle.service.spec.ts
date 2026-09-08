import { BadRequestException } from '@nestjs/common';
import { LifecycleService } from './lifecycle.service';
import { RequestStatus } from './lifecycle.types';

describe('LifecycleService', () => {
  it('creates submitted requests with initial history', () => {
    const service = new LifecycleService();

    const request = service.createRequest('Laptop access');

    expect(request.status).toBe(RequestStatus.SUBMITTED);
    expect(request.history).toHaveLength(1);
    expect(request.history[0]).toMatchObject({
      requestId: request.id,
      fromStatus: null,
      toStatus: RequestStatus.SUBMITTED,
    });
  });

  it('records every successful transition in request history', () => {
    const service = new LifecycleService();
    const request = service.createRequest('Laptop access');

    service.transition(request.id, RequestStatus.IN_PROGRESS);
    const completed = service.transition(request.id, RequestStatus.COMPLETED);

    expect(completed.status).toBe(RequestStatus.COMPLETED);
    expect(completed.history.map((entry) => [entry.fromStatus, entry.toStatus])).toEqual([
      [null, RequestStatus.SUBMITTED],
      [RequestStatus.SUBMITTED, RequestStatus.IN_PROGRESS],
      [RequestStatus.IN_PROGRESS, RequestStatus.COMPLETED],
    ]);
  });

  it('keeps the last confirmed status and history after a failed transition', () => {
    const service = new LifecycleService();
    const request = service.createRequest('Laptop access');

    expect(() => service.transition(request.id, RequestStatus.COMPLETED)).toThrow(
      BadRequestException,
    );

    const unchanged = service.getRequest(request.id);
    expect(unchanged.status).toBe(RequestStatus.SUBMITTED);
    expect(unchanged.history).toHaveLength(1);
  });
});
