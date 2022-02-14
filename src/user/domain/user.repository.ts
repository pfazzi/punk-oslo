import { User as WriteModel, User } from './user';

export interface UserRepository {
  store(user: User): void;

  get(id: string): Promise<WriteModel>;
}
