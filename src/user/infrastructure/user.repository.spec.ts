import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from './user.repository';
import { User as WriteModel } from '../domain/user';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { User as ReadModel } from './user.read-model';
import { RuntimeException } from '@nestjs/core/errors/exceptions/runtime.exception';

describe('UserRepository', () => {
  let userRepository: UserRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/punk-olso'),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      controllers: [],
      providers: [UserRepository],
    }).compile();

    userRepository = app.get<UserRepository>(UserRepository);
  });

  describe('root', () => {
    it('should store new write models', async () => {
      await userRepository.deleteAll();

      const written = WriteModel.fromState({
        id: '5e89a48d-66d6-42ec-b133-1a09362225fb',
        email: 'test@test.com',
        password: 'ciao-boa',
        privacy: true,
        active: true,
      });

      await userRepository.store(written);

      const retrieved = await userRepository.get(
        '5e89a48d-66d6-42ec-b133-1a09362225fb',
      );

      expect(retrieved).toEqual(written);
    });

    it('should throw exception if user does not exist', async () => {
      await userRepository.deleteAll();

      expect(async () => {
        await userRepository.one('7c2d17f3-50df-4f1c-ad49-fb2b9eb2820c');
      }).rejects.toThrow('User not found');
    });

    it('should update write models', async () => {
      await userRepository.deleteAll();

      const written = WriteModel.fromState({
        id: '5e89a48d-66d6-42ec-b133-1a09362225fb',
        email: 'test@test.com',
        password: 'ciao-boa',
        privacy: true,
        active: true,
      });

      await userRepository.store(written);

      let retrieved = await userRepository.get(
        '5e89a48d-66d6-42ec-b133-1a09362225fb',
      );

      retrieved.delete();

      await userRepository.store(written);

      retrieved = await userRepository.get(
        '5e89a48d-66d6-42ec-b133-1a09362225fb',
      );

      expect(retrieved).toEqual(written);
    });

    it('should read a single read model', async () => {
      await userRepository.deleteAll();

      const writeModel = WriteModel.fromState({
        id: '5e89a48d-66d6-42ec-b133-1a09362225fb',
        email: 'test@test.com',
        password: 'ciao-boa',
        privacy: true,
        active: true,
      });

      await userRepository.store(writeModel);

      const retrieved = await userRepository.one(
        '5e89a48d-66d6-42ec-b133-1a09362225fb',
      );

      const expected = new ReadModel(
        '5e89a48d-66d6-42ec-b133-1a09362225fb',
        'test@test.com',
        true,
      );

      expect(retrieved).toEqual(expected);
    });

    it('should read all read models', async () => {
      await userRepository.deleteAll();

      const writeModel = WriteModel.fromState({
        id: 'd5905aa6-f422-4b35-9760-f34e45856362',
        email: 'get-all@test.com',
        password: 'ciao-boa',
        privacy: true,
        active: true,
      });

      await userRepository.store(writeModel);

      const retrieved = await userRepository.getAll();

      const expected = [
        new ReadModel(
          'd5905aa6-f422-4b35-9760-f34e45856362',
          'get-all@test.com',
          true,
        ),
      ];

      expect(retrieved).toEqual(expected);
    });
  });
});
