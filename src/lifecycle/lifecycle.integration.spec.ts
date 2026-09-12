import { DataSource } from 'typeorm';
import { ServiceRequestEntity, RequestHistoryEntryEntity } from './lifecycle.entities';
import { LifecycleRepository } from './lifecycle.repository';
import { RequestStatus } from './lifecycle.types';

describe('Repository-backed lifecycle persistence', () => {
  const testDataSource = new DataSource({
    type: 'sqlite',
    database: ':memory:',
    entities: [ServiceRequestEntity, RequestHistoryEntryEntity],
    synchronize: true,
    logging: false,
  });

  beforeAll(async () => {
    await testDataSource.initialize();
  });

  afterAll(async () => {
    await testDataSource.destroy();
  });

  it('persists a request and its initial history row in SQLite', async () => {
    const repository = new LifecycleRepository(testDataSource);
    const request = await repository.createRequest('Laptop access');

    expect(request.status).toBe(RequestStatus.SUBMITTED);
    expect(request.history).toHaveLength(1);

    const storedRequest = await testDataSource.getRepository(ServiceRequestEntity).findOneBy({ id: request.id });
    const storedHistory = await testDataSource.getRepository(RequestHistoryEntryEntity).find({ where: { requestId: request.id } });

    expect(storedRequest?.description).toBe('Laptop access');
    expect(storedRequest?.status).toBe(RequestStatus.SUBMITTED);
    expect(storedHistory).toHaveLength(1);
    expect(storedHistory[0].toStatus).toBe(RequestStatus.SUBMITTED);
  });
});
