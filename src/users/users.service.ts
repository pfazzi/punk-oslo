// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { CreateUserDto } from './dto/create-user.dto';
// import { User, UserDocument } from './schemas/user.schema';
//
// @Injectable()
//   async findAll(): Promise<User[]> {
//     return this.userModel.find().exec();
//   }
//
//   async findOne(id: string): Promise<User> {
//     return this.userModel.findOne({ _id: id }).exec();
//   }
//
//   async delete(id: string) {
//     const deletedUser = await this.userModel
//       .findByIdAndRemove({ _id: id })
//       .exec();
//     return deletedUser;
//   }
//
//   async patch(id: string, createUserDto: CreateUserDto) {
//     await this.userModel
//       .findByIdAndUpdate(id, createUserDto)
//       .exec();
//     return createUserDto;
//   }
//
// }
