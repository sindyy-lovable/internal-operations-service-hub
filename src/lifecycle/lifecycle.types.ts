export enum RequestStatus {
  SUBMITTED = 'SUBMITTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export interface RequestHistoryEntry {
  id: string;
  requestId: string;
  fromStatus: RequestStatus | null;
  toStatus: RequestStatus;
  occurredAt: string;
}

export interface ServiceRequest {
  id: string;
  description: string;
  status: RequestStatus;
  history: RequestHistoryEntry[];
}
