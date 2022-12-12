import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import {MongooseModule} from "@nestjs/mongoose"
import { UserModel, UserSchema } from '../../models/user.model';
import { UserRepository } from '../repositories/user.repository';
import { UserQueries } from './user.queries';
import { UserService } from './user.service';
import { UserEntity } from '../entities/user.entity';
 
@Module({
  imports:[MongooseModule.forFeature([
    {name:UserModel.name,schema:UserSchema},
  ]),
],
  controllers: [UserController,UserQueries],
  providers:[UserRepository, UserService],
  exports:[UserRepository]
})
export class UserModule {}
