import { User } from './user';

export interface UserRepository {
  store(user: User): void;
}
