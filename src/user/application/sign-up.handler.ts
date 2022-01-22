import { UserRepository } from '../domain/user.repository';
import { User } from '../domain/user';
import { SignUp } from './sign-up';
import { Inject } from '@nestjs/common';

export class SignUpHandler {
  constructor(
    @Inject('UserRepository') private readonly repository: UserRepository,
  ) {}

  handle(command: SignUp): void {
    const user: User = new User(
      command.email,
      command.password,
      command.privacy,
    );

    this.repository.store(user);
  }
}
