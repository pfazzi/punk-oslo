import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckController } from './health-check.controller';
import { SystemClock } from './system-clock';
import { FakeClock } from './fake-clock';

describe('HealthCheckController', () => {
  let healthCheckController: HealthCheckController;

  beforeEach(async () => {
    const clockFactory = () => new FakeClock(new Date('2021-01-01T23:40:34'));

    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthCheckController],
      providers: [
        {
          provide: 'Clock',
          useFactory: clockFactory,
        },
      ],
    }).compile();

    healthCheckController = app.get<HealthCheckController>(
      HealthCheckController,
    );
  });

  describe('root', () => {
    it('should return current timestamp', () => {
      expect(healthCheckController.timestamp()).toEqual(
        new Date('2021-01-01T22:40:34.000Z'),
      );
    });
  });
});
