import { IsEmail,IsString } from 'class-validator';

export namespace AccountChangeUserName {
    export const topic = 'account.change.user.name.command'

    export class Request{
        @IsString()
        userId:string;

        @IsString()
        newName:string;
    }

    export class Response{
        status:string
    }
}