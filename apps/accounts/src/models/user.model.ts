import {Schema,Prop,SchemaFactory} from "@nestjs/mongoose"
import { IUser, UserRole } from "@purple/interfaces"
import {Document} from "mongoose"

@Schema({collection:"user"})
export class UserModel extends Document implements IUser{
    @Prop({required:true})
    name:string;

    @Prop({required:true})
    email:string;   

    @Prop({required:true})
    password:string;

    @Prop({type:String, enum:UserRole,required:true,default:UserRole.STUDENT})
    role:UserRole;

}

export const UserSchema = SchemaFactory.createForClass(UserModel)