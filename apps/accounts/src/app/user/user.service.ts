import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
    constructor(private readonly userRepository:UserRepository){
    }

    async changeUserName(userId:string,newName:string){
        const ifUserExist = await this.userRepository.findUserById(userId)
        if(!ifUserExist) return {status:'404'}
        const user:UserEntity = await new UserEntity(ifUserExist).changeUserName(newName)
        await this.userRepository.updateUser(user)
        return {status:'204'}
    }
}
