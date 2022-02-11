// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   HttpException,
//   HttpStatus,
//   Param,
//   Patch,
//   Post,
//   UseGuards,
// } from '@nestjs/common';
// import { UsersService as UsersService } from './users.service';
// import { CreateUserDto as CreateUserDto } from './dto/create-user.dto';
// import { User } from './schemas/user.schema';
// import { AdminGuard } from 'src/shared/guards/admin.guard';
//
// @Controller('admin-users')
// @UseGuards(AdminGuard)
// export class AdminUsersController {
//   constructor(private readonly usersService: UsersService) {}
//
//   @Get()
//   async findAll(): Promise<User[]> {
//     return this.usersService.findAll();
//   }
//
//   @Get(':id')
//   async findOne(@Param('id') id: string): Promise<User> {
//     return this.usersService.findOne(id);
//   }
//
//   @Delete(':id')
//   async delete(@Param('id') id: string) {
//     return this.usersService.delete(id);
//   }
//
//   @Patch(':id')
//   async patch(@Param('id') id: string, @Body() createUserDto: CreateUserDto) {
//     return this.usersService.patch(id, createUserDto);
//   }
// }
