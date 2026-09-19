import { Body, Controller, Post } from '@nestjs/common';
import { AiIntakeService } from './ai-intake.service';
import { AiIntakeResult } from './ai-intake.types';

interface AiIntakeBody {
  freeText?: unknown;
}

@Controller('ai-intake')
export class AiIntakeController {
  constructor(private readonly aiIntakeService: AiIntakeService) {}

  @Post()
  async analyze(@Body() body: AiIntakeBody): Promise<AiIntakeResult> {
    return this.aiIntakeService.analyze(body.freeText);
  }
}