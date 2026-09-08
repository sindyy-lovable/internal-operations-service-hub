import { isValidTransition } from './transition-policy';
import { RequestStatus } from './lifecycle.types';

describe('isValidTransition', () => {
  it.each([
    [RequestStatus.SUBMITTED, RequestStatus.IN_PROGRESS],
    [RequestStatus.IN_PROGRESS, RequestStatus.COMPLETED],
  ])('accepts %s -> %s', (fromStatus, toStatus) => {
    expect(isValidTransition(fromStatus, toStatus)).toBe(true);
  });

  it.each([
    [RequestStatus.SUBMITTED, RequestStatus.COMPLETED],
    [RequestStatus.COMPLETED, RequestStatus.IN_PROGRESS],
  ])('rejects %s -> %s', (fromStatus, toStatus) => {
    expect(isValidTransition(fromStatus, toStatus)).toBe(false);
  });
});
