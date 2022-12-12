import { Body, Controller, Post } from '@nestjs/common';
import { UserRole } from '@purple/interfaces';
import { AuthService } from './auth.service';
import {AccountLogin,AccountRegister} from "@purple/contracts"
import {RMQRoute, RMQValidate} from "nestjs-rmq"

@Controller()
export class AuthController {
    constructor(
        private readonly authService:AuthService
    ){}

    @RMQValidate()
    @RMQRoute(AccountRegister.topic)
    async register(@Body() dto:AccountRegister.Request):Promise<AccountRegister.Response>{
        return await this.authService.register(dto)
    }

    @RMQValidate()
    @RMQRoute(AccountLogin.topic)
    async login(@Body() dto:AccountLogin.Request):Promise<AccountLogin.Response>{
        const {id} = await this.authService.validateUser(dto)
        return await this.authService.login(id)
    }
}
