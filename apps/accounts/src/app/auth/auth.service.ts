import { Injectable } from '@nestjs/common';
import { UserRole } from '@purple/interfaces';
import { UserEntity } from '../user/entities/user.entity';
import { UserRepository } from '../repositories/user.repository';
import {JwtService} from "@nestjs/jwt"
import { AccountLogin, AccountRegister } from '@purple/contracts';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository:UserRepository,
        private readonly jwtService:JwtService,
        private readonly configService:ConfigService
        ){}

    async register({email,password,name}: AccountRegister.Request){
        const ifUserExist = await this.userRepository.findUser(email)
        if(ifUserExist) throw new Error('User is already exist')
        
        const user = await new UserEntity({email,name,role:UserRole.STUDENT}).setPassword(password)
        const newUser = await this.userRepository.createUser(user)
        return {email:newUser.email}
    }

    async validateUser({email,password}: AccountLogin.Request){
        const ifUserExist = await this.userRepository.findUser(email)
        if(!ifUserExist) throw new Error('User doesn`t exist')

        const user = new UserEntity(ifUserExist)
        const isCorrectPassport = await user.comparePassword(password)
        
        if(!isCorrectPassport) throw new Error('Login or passport is incorrect')
        return {id:user._id}
    }

    async login(id:string){
        return {
            acces_token: await  this.jwtService.signAsync({id},{secret:this.configService.get('JWT_SECRET')})
        }
    }
}
