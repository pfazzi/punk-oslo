import { UserRepository } from '../domain/user.repository';
import { User } from '../domain/user';
import { SignUp } from './sign-up';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { DomainEventDispatcher } from '../../shared/domain/domain-event-dispatcher';

export class SignUpHandler {
  constructor(
    @Inject('UserRepository') private readonly repository: UserRepository,
    private readonly eventDispatcher: DomainEventDispatcher,
  ) {}

  handle(command: SignUp): void {
    if (!command.privacy) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN); // TODO: usare eccezione non specifica per HTTP
    }

    const user: User = User.singUp(
      command.id,
      command.email,
      command.password,
      command.privacy,
    );

    this.repository.store(user);

    this.eventDispatcher.dispatch(...user.releaseEvents());
  }
}
