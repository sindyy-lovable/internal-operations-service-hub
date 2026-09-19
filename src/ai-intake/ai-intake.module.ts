import { Module } from '@nestjs/common';
import { AiIntakeController } from './ai-intake.controller';
import { AiIntakeService } from './ai-intake.service';
import { AiIntakeModelProvider } from './ai-intake.model-provider';

@Module({
  controllers: [AiIntakeController],
  providers: [
    AiIntakeModelProvider,
    {
      provide: AiIntakeService,
      useFactory: (provider: AiIntakeModelProvider) =>
        new AiIntakeService(provider),
      inject: [AiIntakeModelProvider],
    },
  ],
})
export class AiIntakeModule {}