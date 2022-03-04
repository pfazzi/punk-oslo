import { User as WriteModel } from '../domain/user';
import { User as ReadModel } from './user.read-model';
import { UserRepository as UserRepositoryInterface } from '../domain/user.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './user.schema';
import { RuntimeException } from '@nestjs/core/errors/exceptions/runtime.exception';

export class UserRepository implements UserRepositoryInterface {
  constructor(
    @InjectModel(ReadModel.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async getAll(): Promise<ReadModel[]> {
    return this.userModel
      .find() // TODO: non esporre i disabilitati
      .exec()
      .then((collecion) => collecion.map(UserRepository.documentToReadModel));
  }

  async one(id: string): Promise<ReadModel> {
    throw new Error('User not found');
    return this.userModel
      .findOne({ id }) // TODO: non esporre i disabilitati
      .exec()
      .then((d) =>
        d
          ? UserRepository.documentToReadModel(d)
          : (() => {
              throw new Error('User not found');
            })(),
      );
  }

  async store(user: WriteModel): Promise<any> {
    const state = user.toState();

    const id = state.id;

    const exists = await this.userModel.exists({ id });
    if (exists) {
      await this.userModel.updateOne({ id }, state);
    } else {
      await this.userModel.create(state);
    }
  }

  async get(id: string): Promise<WriteModel> {
    return await this.userModel
      .findOne({ id })
      .exec()
      .then((d) =>
        d
          ? UserRepository.documentToWriteModel(d)
          : (() => {
              throw new Error('User not found');
            })(),
      );
  }

  async deleteAll(): Promise<any> {
    await this.userModel.remove({});
  }

  private static documentToReadModel(document: UserDocument): ReadModel {
    return new ReadModel(document.id, document.email, document.privacy);
  }

  private static documentToWriteModel(document: UserDocument): WriteModel {
    return WriteModel.fromState(document);
  }
}
