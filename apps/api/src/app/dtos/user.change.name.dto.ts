import { UserRole } from "@purple/interfaces";
import { IsEmail, IsEnum, IsString } from "class-validator";

export class UserChangeNameDto{
    @IsString()
    newName:string;
}