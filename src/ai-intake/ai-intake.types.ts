export interface AiIntakeResult {
  category: 'IT' | 'HR' | 'UNKNOWN';
  summary: string;
  needsClarification: boolean;
}
