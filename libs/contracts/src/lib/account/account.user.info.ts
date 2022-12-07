import {IUser, UserRole} from "@purple/interfaces"
import {IsEmail,IsString,IsEnum} from "class-validator"

export namespace AccountUserInfoQuery {
    export const topic = 'account.user.info.query'

    export class Request{
        @IsString()
        id:string
    }

    export class Response{
        user:Omit<IUser,'passwordHash'>
    }
}