import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import {MongooseModule} from "@nestjs/mongoose"
import { UserModel, UserSchema } from '../../models/user.model';
import { UserRepository } from '../repositories/user.repository';
import { UserQueries } from './user.queries';
 
@Module({
  imports:[MongooseModule.forFeature([
    {name:UserModel.name,schema:UserSchema},
  ])],
  controllers: [UserController,UserQueries],
  providers:[UserRepository],
  exports:[UserRepository]
})
export class UserModule {}
