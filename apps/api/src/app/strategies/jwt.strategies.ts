import { ConfigService } from "@nestjs/config"
import { PassportStrategy } from "@nestjs/passport"
import { IJwtPayload } from "@purple/interfaces"
import { ExtractJwt, Strategy } from "passport-jwt"

export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(configService:ConfigService){
        super({
                jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken,
                ignoreExparation:true,
                secretOrKey: configService.get('JWT_SERCRET')
        })
    }

    async validate( { id }: IJwtPayload ){
        return id
    }
}