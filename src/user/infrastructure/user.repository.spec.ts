import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from './user.repository';
import { User as WriteModel } from '../domain/user';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';

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
    it('should store write models', async () => {
      const written = WriteModel.fromState({
        id: '5e89a48d-66d6-42ec-b133-1a09362225fb',
        email: 'test@test.com',
        password: 'ciao-boa',
        privacy: true,
        active: true,
      });

      userRepository.store(written);

      const retrieved = await userRepository.get(
        '5e89a48d-66d6-42ec-b133-1a09362225fb',
      );

      expect(retrieved).toEqual(written);
    });
  });
});
