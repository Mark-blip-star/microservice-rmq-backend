import {IUser, IUserCourses, UserRole} from "@purple/interfaces"
import {IsEmail,IsString,IsEnum} from "class-validator"

export namespace AccountUserCoursesQuery {
    export const topic = 'account.user.courses.query'

    export class Request{
        @IsString()
        id:string
    }

    export class Response{
        courses:IUserCourses[]
    }
}