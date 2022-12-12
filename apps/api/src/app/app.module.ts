import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { RMQModule } from 'nestjs-rmq';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './controllers/auth.controller';
import { getJwtConfig } from "../app/../../../accounts/src/app/configs/jwt.config"
import { getRmqConfig}  from "../app/../../../accounts/src/app/configs/rmq.config"
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './controllers/user.controller';
import { JwtStrategy } from './strategies/jwt.strategies';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath:'envs/.api.env',isGlobal:true}),
    RMQModule.forRootAsync(getRmqConfig()),
    JwtModule.registerAsync(getJwtConfig()),
    PassportModule
  ],
  controllers: [AuthController,UserController],
  providers: [JwtStrategy],
})
export class AppModule {}
