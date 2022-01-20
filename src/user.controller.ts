import { Controller, Get, Param } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Controller('users')
export class UserController {
  constructor(private readonly repository: UserRepository) {}

  @Get()
  list(): string {
    return JSON.stringify(this.repository.getAll());
  }

  @Get(':username')
  get(@Param('username') username: string): string {
    return JSON.stringify(this.repository.oneByUsername(username));
  }
}
