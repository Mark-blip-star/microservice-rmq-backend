import {UserRole} from "@purple/interfaces"
export namespace AccountRegister {
    export const topic = 'account.login.command'

    export class Request{
        email:string;
        password:string;
        name:string;
        role:UserRole;
    }

    export class Response{
        email: string;
    }
}