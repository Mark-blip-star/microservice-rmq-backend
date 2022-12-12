import { Body, Controller, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';
import { AccountLogin,AccountRegister } from "@purple/contracts"
import { LoginDto } from '../dtos/login.dto';
import { RegisterDto } from '../dtos/register.dto';
import { JWTAuthGuard } from '../guards/jwt.auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly rmqService:RMQService) {}

  @Post('register')
  async register(@Body() dto:RegisterDto) {
    try{  
      return await this.rmqService.send<AccountRegister.Request,AccountRegister.Response>(AccountRegister.topic,dto)
    }catch(error){  
      if(error) {
        throw new UnauthorizedException(error.message,error.status)
      }
    }
  }

  @Post('login')
  async login(@Body() dto:LoginDto) {
    try{
      return await this.rmqService.send<AccountLogin.Request,AccountLogin.Response>(AccountLogin.topic,dto)
    }catch(error:any){
      if(error) {
        throw new UnauthorizedException(error.message,error.status)
      }
    }
  }
}
