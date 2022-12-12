import { Body, Controller } from '@nestjs/common';
import { AccountChangeUserName } from '@purple/contracts';
import { RMQRoute, RMQValidate } from 'nestjs-rmq';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService:UserService){}

    @RMQValidate()
    @RMQRoute(AccountChangeUserName.topic)
    async changeUserName(@Body() {userId,newName}:AccountChangeUserName.Request):Promise<AccountChangeUserName.Response>{
        return await this.userService.changeUserName(userId,newName)
    }
}
