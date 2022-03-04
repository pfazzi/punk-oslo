import { User as WriteModel } from '../domain/user';
import { User as ReadModel } from './user.read-model';
import { UserRepository as UserRepositoryInterface } from '../domain/user.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './user.schema';

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
    return this.userModel
      .findOne({ _id: id }) // TODO: non esporre i disabilitati
      .exec()
      .then(UserRepository.documentToReadModel);
  }

  store(user: WriteModel): void {
    const state = user.toState();

    const id = state.id;

    const exists = this.userModel.exists({ id });
    if (exists) {
      this.userModel.findByIdAndUpdate(id, state);
    } else {
      this.userModel.create(state);
    }
  }

  async get(id: string): Promise<WriteModel> {
    return await this.userModel
      .findOne({ id })
      .exec()
      .then((d) => (d ? UserRepository.documentToWriteModel(d) : null));
  }

  private static documentToReadModel(document: UserDocument): ReadModel {
    return new ReadModel(document.id, document.email, document.privacy);
  }

  private static documentToWriteModel(document: UserDocument): WriteModel {
    return WriteModel.fromState(document);
  }
}
