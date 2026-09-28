import {
  Controller,
  Get,
  ServiceUnavailableException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';

@Controller('health')
export class HealthController {
  constructor(private readonly dataSource: DataSource) {}

  @Get()
  async check() {
const release =
  process.env.RELEASE_SHA ??
  process.env.RENDER_GIT_COMMIT ??
  'local';
    try {
      if (process.env.FORCE_NOT_READY === 'true') {
        throw new Error('Controlled readiness failure');
      }

      await this.dataSource.query('SELECT 1');

      return {
        status: 'ok',
        database: 'ok',
        release,
      };
    } catch {
      throw new ServiceUnavailableException({
        status: 'degraded',
        database: 'unavailable',
        release,
      });
    }
  }
}