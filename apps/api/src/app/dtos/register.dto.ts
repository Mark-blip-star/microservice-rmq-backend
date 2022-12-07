import { UserRole } from "@purple/interfaces";
import { IsEmail, IsEnum, IsString } from "class-validator";

export class RegisterDto{
    @IsEmail()
    email:string;

    @IsString()
    password:string;

    @IsString()
    name:string;
    
    @IsEnum({default:UserRole.STUDENT})
    role:UserRole;
}