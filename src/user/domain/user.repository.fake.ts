import { User as WriteModel, User } from './user';
import { UserRepository } from './user.repository';

export class FakeUserRepository implements UserRepository {
  constructor(public readonly users = new Map<string, User>()) {}

  store(user: User): void {
    this.users.set(user.id(), user);
  }

  get(id: string): Promise<WriteModel> {
    return new Promise<WriteModel>((resolve, reject) => {
      if (this.users.has(id)) {
        resolve(this.users.get(id));
      }

      reject(null);
    });
  }
}
