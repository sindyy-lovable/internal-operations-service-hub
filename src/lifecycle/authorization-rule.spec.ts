import { ForbiddenException } from '@nestjs/common';
import { LifecycleService } from './lifecycle.service';
import { RequestStatus } from './lifecycle.types';

describe('Authorization business rule', () => {
  it('allows an IT actor in the IT department to transition SUBMITTED -> IN_PROGRESS', () => {
    const service = new LifecycleService();
    const request = service.createRequest('Laptop access');

    const result = service.transition(request.id, RequestStatus.IN_PROGRESS, 'IT', 'IT');

    expect(result.status).toBe(RequestStatus.IN_PROGRESS);
    expect(result.history[1].fromStatus).toBe(RequestStatus.SUBMITTED);
    expect(result.history[1].toStatus).toBe(RequestStatus.IN_PROGRESS);
  });

  it('denies a non-IT actor in a non-IT department', () => {
    const service = new LifecycleService();
    const request = service.createRequest('Laptop access');

    expect(() => service.transition(request.id, RequestStatus.IN_PROGRESS, 'HR', 'HR')).toThrow(
      ForbiddenException,
    );
  });
});
