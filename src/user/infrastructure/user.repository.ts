import { User } from '../domain/user';

export class UserRepository implements UserRepository {
  private readonly users: User[] = [];

  getAll(): User[] {
    return this.users;
  }

  oneByEmail(email: string): User {
    return this.users.find((user: User) => user.email === email);
  }
}
