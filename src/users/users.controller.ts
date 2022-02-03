import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService as UsersService } from './users.service';
import { CreateUserDto as CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { AdminGuard } from 'src/shared/guards/admin.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    if (!createUserDto.privacy) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
    await this.usersService.create(createUserDto);
  }
}
