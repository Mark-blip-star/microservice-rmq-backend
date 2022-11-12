import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from '../app/configs/jwt.config';
import { UserModule } from '../app/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports:[
        // MongooseModule.forFeature([
        //     {name:UserModel.name,schema:UserSchema}
        //  ]),
         UserModule,
        JwtModule.registerAsync(getJwtConfig())
    ],
    controllers:[AuthController],
    providers:[AuthService]
})
export class AuthModule {}
