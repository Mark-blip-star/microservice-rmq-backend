import { Body, Controller, Post } from '@nestjs/common';
import { UserRole } from '@purple/interfaces';
import { AuthService } from './auth.service';
import {AccountLogin,AccountRegister} from "@purple/contracts"

export class registerDto{
    email:string;
    password:string;
    name:string;
    role:UserRole;
}

export class loginDto{
    email:string;
    password:string;
}

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService:AuthService
    ){}

    @Post('register')
    async register(@Body() dto:AccountRegister.Request):Promise<AccountRegister.Response>{
        return await this.authService.register(dto)
    }

    @Post('login')
    async login(@Body() dto:AccountLogin.Request):Promise<AccountLogin.Response>{
        const {email} = await this.authService.validateUser(dto)
        return await this.authService.login(email)
    }
}
