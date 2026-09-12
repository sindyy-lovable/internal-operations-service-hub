import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  ForbiddenException,
} from '@nestjs/common';
import { LifecycleService } from './lifecycle.service';
import { LifecycleRepository } from './lifecycle.repository';
import { RequestStatus } from './lifecycle.types';

interface CreateRequestBody {
  description?: unknown;
}

interface TransitionRequestBody {
  status?: unknown;
  actor?: unknown;
  department?: unknown;
}

@Controller('requests')
export class LifecycleController {
  constructor(
    private readonly lifecycleService: LifecycleService,
    private readonly lifecycleRepository: LifecycleRepository,
  ) {}

  @Post()
  async create(@Body() body: CreateRequestBody) {
    if (typeof body.description !== 'string' || body.description.trim() === '') {
      throw new BadRequestException('description is required');
    }

    return this.lifecycleRepository.createRequest(body.description.trim());
  }

  @Get(':requestId')
  async get(@Param('requestId') requestId: string) {
    return this.lifecycleRepository.getRequest(requestId);
  }

  @Patch(':requestId/status')
  async transition(
    @Param('requestId') requestId: string,
    @Body() body: TransitionRequestBody,
  ) {
    if (!Object.values(RequestStatus).includes(body.status as RequestStatus)) {
      throw new BadRequestException('status must be a valid request status');
    }

    if (typeof body.actor !== 'string' || typeof body.department !== 'string') {
      throw new ForbiddenException('actor and department are required');
    }

    if (body.actor !== 'IT' || body.department !== 'IT') {
      throw new ForbiddenException('only IT actors may transition this request');
    }

    return this.lifecycleRepository.transition(
      requestId,
      body.status as RequestStatus,
      body.actor as string,
      body.department as string,
    );
  }
}
