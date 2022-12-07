import { Body, Controller, Post } from '@nestjs/common';
import { UserRole } from '@purple/interfaces';
import {AccountLogin,AccountRegister, AccountUserCoursesQuery, AccountUserInfoQuery} from "@purple/contracts"
import {RMQRoute, RMQValidate} from "nestjs-rmq"
import { UserRepository } from '../repositories/user.repository';

@Controller()
export class UserQueries {
    constructor(private readonly userRepository:UserRepository){}

    @RMQValidate()
    @RMQRoute(AccountUserInfoQuery.topic)
    async userInfo(@Body() {id}:AccountUserInfoQuery.Request):Promise<AccountUserInfoQuery.Response>{
        const user = await this.userRepository.findUserById(id)
        return {
            user
        }
    }

    @RMQValidate()
    @RMQRoute(AccountUserCoursesQuery.topic)
    async userCourses(@Body() {id}:AccountUserCoursesQuery.Request):Promise<AccountUserCoursesQuery.Response>{
        const user = await this.userRepository.findUserById(id)
        return {
            courses:user.courses
        }
    }
}
