import { RequestStatus } from './lifecycle.types';

const validTransitions: ReadonlyMap<RequestStatus, ReadonlySet<RequestStatus>> = new Map([
  [RequestStatus.SUBMITTED, new Set([RequestStatus.IN_PROGRESS])],
  [RequestStatus.IN_PROGRESS, new Set([RequestStatus.COMPLETED])],
  [RequestStatus.COMPLETED, new Set()],
]);

export function isValidTransition(
  fromStatus: RequestStatus,
  toStatus: RequestStatus,
): boolean {
  return validTransitions.get(fromStatus)?.has(toStatus) ?? false;
}
