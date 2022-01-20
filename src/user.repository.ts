import { User } from './user';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  private readonly users: User[];

  constructor() {
    this.users = [
      new User('pfazzi', 'patrick@fazzi.test'),
      new User('gboa', 'giorgio@boa.test'),
    ];
  }

  getAll(): User[] {
    return this.users;
  }

  oneByUsername(username: string): User {
    return this.users.find((user: User) => user.username === username);
  }
}
