import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../app.module';
import * as request from 'supertest';

describe('Service Request e2e minimum slice', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('creates a request, rejects an empty description, and returns 404 for unknown request lookup', async () => {
    const empty = await request(app.getHttpServer()).post('/requests').send({ description: '   ' });
    expect(empty.status).toBe(400);

    const missing = await request(app.getHttpServer()).get('/requests/00000000-0000-0000-0000-000000000000');
    expect(missing.status).toBe(404);
  });

  it('allows IT to transition SUBMITTED -> IN_PROGRESS and denies HR', async () => {
    const create = await request(app.getHttpServer()).post('/requests').send({ description: 'Laptop access' });
    expect(create.status).toBe(201);

    const id = create.body.id;

    const allowed = await request(app.getHttpServer())
      .patch(`/requests/${id}/status`)
      .send({ status: 'IN_PROGRESS', actor: 'IT', department: 'IT' });
    expect(allowed.status).toBe(200);
    expect(allowed.body.status).toBe('IN_PROGRESS');

    const denied = await request(app.getHttpServer())
      .patch(`/requests/${id}/status`)
      .send({ status: 'IN_PROGRESS', actor: 'HR', department: 'HR' });
    expect(denied.status).toBe(403);
  });
});
