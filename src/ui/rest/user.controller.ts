import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User as UserReadModel } from '../../user/infrastructure/user.read-model';
import { UserRepository } from '../../user/infrastructure/user.repository';
import { SignUp } from '../../user/application/sign-up';
import { SignUpHandler } from '../../user/application/sign-up.handler';
import { AdminGuard } from './guards/admin.guard';
import { DeleteHandler } from '../../user/application/delete.handler';

@Controller('users')
export class UserController {
  constructor(
    @Inject('UserRepository') private readonly repository: UserRepository,
    private readonly signUpHandler: SignUpHandler,
    private readonly deleteHandler: DeleteHandler,
  ) {}

  @Get()
  @UseGuards(AdminGuard)
  async list(): Promise<UserReadModel[]> {
    return this.repository.getAll();
  }

  @Get(':id')
  @UseGuards(AdminGuard)
  async get(@Param('id') id: string): Promise<UserReadModel> {
    return this.repository.one(id);
  }

  @Post()
  async signUp(@Body() command: SignUp) {
    this.signUpHandler.handle(command);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.deleteHandler.handle({ id });
  }
}
