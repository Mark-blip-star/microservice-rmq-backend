import { Body, Controller, Post, UnauthorizedException,Request, UseGuards } from '@nestjs/common';
import { RMQService } from 'nestjs-rmq';
import { AccountChangeUserName, AccountLogin,AccountRegister } from "@purple/contracts"
import { UserId } from '../guards/user.guard';
import { UserChangeNameDto } from '../dtos/user.change.name.dto';
import { JWTAuthGuard } from '../guards/jwt.auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly rmqService:RMQService) {}

  @UseGuards(JWTAuthGuard)
  @Post('change-user-name')
  async changeUserName(@UserId() userId:string,@Body() {newName}:UserChangeNameDto,@Request() req) {
    try{  
      console.log(111)
      if(!userId) throw new UnauthorizedException()
      return await this.rmqService.send<AccountChangeUserName.Request,AccountChangeUserName.Response>(AccountChangeUserName.topic,{userId,newName})
    }catch(error){  
      if(error) {
        throw new UnauthorizedException(error.message,error.status)
      }
    }
  }
}
