import {UserRole} from "@purple/interfaces"
import {IsEmail,IsString,IsEnum} from "class-validator"
export namespace AccountRegister {
    export const topic = 'account.register.command'

    export class Request{
        @IsEmail()
        email:string;

        @IsString()
        password:string;

        @IsString()
        name:string;
        
        @IsEnum({default:UserRole.STUDENT})
        role:UserRole;
    }

    export class Response{
        email: string;
    }
}