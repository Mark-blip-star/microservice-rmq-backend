import { IUser, UserRole } from "@purple/interfaces";
import {genSalt,hash,compare} from "bcrypt"
export class UserEntity implements IUser{
    _id?: string;
    role: UserRole;
    password: string;
    email: string;
    name:string

    constructor(user:IUser){
        this._id = user._id
        this.email = user.email
        this.name = user.name
        this.password = user.password
        this.role = user.role
    }

    public async setPassword(password:string){
        const salt = await genSalt(4)
        this.password = await hash(password,salt)
        return this
    }

    public async comparePassword(password:string){
        return await compare(password,this.password)
    }
}