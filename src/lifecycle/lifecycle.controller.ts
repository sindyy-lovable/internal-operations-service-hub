import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { LifecycleService } from './lifecycle.service';
import { RequestStatus } from './lifecycle.types';

interface CreateRequestBody {
  description?: unknown;
}

interface TransitionRequestBody {
  status?: unknown;
}

@Controller('requests')
export class LifecycleController {
  constructor(private readonly lifecycleService: LifecycleService) {}

  @Post()
  create(@Body() body: CreateRequestBody) {
    if (typeof body.description !== 'string' || body.description.trim() === '') {
      throw new BadRequestException('description is required');
    }

    return this.lifecycleService.createRequest(body.description.trim());
  }

  @Get(':requestId')
  get(@Param('requestId') requestId: string) {
    return this.lifecycleService.getRequest(requestId);
  }

  @Patch(':requestId/status')
  transition(
    @Param('requestId') requestId: string,
    @Body() body: TransitionRequestBody,
  ) {
    if (!Object.values(RequestStatus).includes(body.status as RequestStatus)) {
      throw new BadRequestException('status must be a valid request status');
    }

    return this.lifecycleService.transition(
      requestId,
      body.status as RequestStatus,
    );
  }
}
