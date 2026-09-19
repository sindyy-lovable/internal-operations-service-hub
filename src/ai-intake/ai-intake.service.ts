import { BadGatewayException, BadRequestException } from '@nestjs/common';
import { AiIntakeProvider } from './ai-intake.provider';
import { AiIntakeResult } from './ai-intake.types';

export class AiIntakeService {
  constructor(private readonly provider: AiIntakeProvider) {}

  async analyze(freeText: unknown): Promise<AiIntakeResult> {
    if (typeof freeText !== 'string' || freeText.trim() === '') {
      throw new BadRequestException('freeText is required');
    }

    let result: AiIntakeResult;

    try {
      result = await this.provider.analyze(freeText.trim());
    } catch {
      throw new BadGatewayException('AI provider unavailable');
    }

    if (
      !result ||
      !['IT', 'HR', 'UNKNOWN'].includes(result.category) ||
      typeof result.summary !== 'string' ||
      typeof result.needsClarification !== 'boolean'
    ) {
      throw new BadGatewayException('AI provider returned invalid output');
    }

    return result;
  }
}