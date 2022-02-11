import { UserRepository } from '../domain/user.repository';
import { User } from '../domain/user';
import { SignUp } from './sign-up';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { Delete } from './delete';

export class DeleteHandler {
  constructor(
    @Inject('UserRepository') private readonly repository: UserRepository,
  ) {}

  async handle(command: Delete): Promise<any> {
    const user = await this.repository.get(command.id);

    user.delete();

    this.repository.store(user);
  }
}
