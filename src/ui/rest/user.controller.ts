import { Controller, Get, Inject, Param } from '@nestjs/common';
import { User } from '../../user/domain/user';
import { UserRepository } from '../../user/infrastructure/user.repository';

@Controller('users')
export class UserController {
  constructor(
    @Inject('UserRepository') private readonly repository: UserRepository,
  ) {}

  @Get()
  list(): User[] {
    return this.repository.getAll();
  }

  @Get(':email')
  get(@Param('email') email: string): User {
    return this.repository.oneByEmail(email);
  }
}
