import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { PassportStrategy } from "@nestjs/passport"
import { IJwtPayload } from "@purple/interfaces"
import { ExtractJwt, Strategy } from "passport-jwt"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(configService:ConfigService){
        super({
                jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
                ignoreExparation:false,
                secretOrKey: configService.get('JWT_SECRET')    
        })
    }

    async validate( { id }: IJwtPayload ){
        console.log('validate')
            return id
    }
}