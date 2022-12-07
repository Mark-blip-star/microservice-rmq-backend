import { Injectable } from '@nestjs/common';
import { UserRole } from '@purple/interfaces';
import { UserEntity } from '../app/entities/user.entity';
import { UserRepository } from '../app/repositories/user.repository';
// import { loginDto, registerDto } from './auth.controller';
import {JwtService} from "@nestjs/jwt"
import { AccountLogin, AccountRegister } from '@purple/contracts';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository:UserRepository,
        private readonly jwtService:JwtService
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
        return {email:user.email}
    }

    async login(email:string){
        return {
            acces_token: await  this.jwtService.signAsync(email)
        }
    }
}
