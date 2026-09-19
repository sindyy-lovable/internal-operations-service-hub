import { AiIntakeResult } from './ai-intake.types';

export interface AiIntakeProvider {
  analyze(freeText: string): Promise<AiIntakeResult>;
}
