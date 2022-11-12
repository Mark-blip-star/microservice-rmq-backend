import { Injectable, Module } from "@nestjs/common";
import {InjectModel } from "@nestjs/mongoose"
import {Model} from "mongoose"
    import { UserModel } from "../../models/user.model";
import { UserEntity } from "../entities/user.entity";

@Injectable()
export class UserRepository{
    constructor(
         @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>
    ){}

    async createUser(user:UserEntity){
        const newUser = new this.userModel(user)
        return newUser.save()
    }

    async findUser(email:string){
        return this.userModel.findOne({email})
    }

    async deleteUser(email:string){
        return this.userModel.deleteOne({email})
    }
}
