import {Schema,Prop,SchemaFactory} from "@nestjs/mongoose"
import { IUser, IUserCourses, PurchaseState, UserRole } from "@purple/interfaces"
import {Document,Types} from "mongoose"

@Schema()
export class UserCourses extends Document implements IUserCourses{
   @Prop({required:true})
   courseId:string

   @Prop({required:true,enum:PurchaseState,type:String})
   purchaseState:PurchaseState
}

export const UserCoursesSchema = SchemaFactory.createForClass(UserCourses)

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

    @Prop({type:[UserCoursesSchema]})
    courses?: Types.Array<UserCourses>
}

export const UserSchema = SchemaFactory.createForClass(UserModel)