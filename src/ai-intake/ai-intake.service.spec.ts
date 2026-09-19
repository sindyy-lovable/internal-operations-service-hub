import { BadGatewayException, BadRequestException } from '@nestjs/common';
import { AiIntakeProvider } from './ai-intake.provider';
import { AiIntakeService } from './ai-intake.service';

describe('AiIntakeService', () => {
  it('rejects empty employee input', async () => {
    const provider: AiIntakeProvider = {
      analyze: jest.fn(),
    };

    const service = new AiIntakeService(provider);

    await expect(service.analyze('')).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });

  it('accepts a valid structured AI result', async () => {
    const provider: AiIntakeProvider = {
      analyze: jest.fn().mockResolvedValue({
        category: 'IT',
        summary: 'Employee cannot access the company Wi-Fi.',
        needsClarification: false,
      }),
    };

    const service = new AiIntakeService(provider);

    await expect(
      service.analyze('I cannot connect to the company Wi-Fi'),
    ).resolves.toEqual({
      category: 'IT',
      summary: 'Employee cannot access the company Wi-Fi.',
      needsClarification: false,
    });
  });

  it('rejects invalid AI output', async () => {
    const provider = {
      analyze: jest.fn().mockResolvedValue({
        category: 'FINANCE',
        summary: 'Invalid category',
        needsClarification: false,
      }),
    } as unknown as AiIntakeProvider;

    const service = new AiIntakeService(provider);

    await expect(
      service.analyze('I have a payment issue'),
    ).rejects.toBeInstanceOf(BadGatewayException);
  });

  it('handles AI provider failure', async () => {
    const provider: AiIntakeProvider = {
      analyze: jest.fn().mockRejectedValue(new Error('Provider unavailable')),
    };

    const service = new AiIntakeService(provider);

    await expect(
      service.analyze('My laptop is not working'),
    ).rejects.toBeInstanceOf(BadGatewayException);
  });
});