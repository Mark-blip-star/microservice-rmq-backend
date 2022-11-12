import {MongooseModuleAsyncOptions} from "@nestjs/mongoose"
import {ConfigService,ConfigModule} from "@nestjs/config"
export const getMongoConfig = ():MongooseModuleAsyncOptions => {
    return {
        useFactory: (configService:ConfigService) => ({
            uri:getMongoString(configService)
        }),
        imports:[ConfigModule],
        inject:[ConfigService]
    }
}

const getMongoString = (configService:ConfigService) => {
    return 'mongodb+srv://Mark:Mark200318@cluster0.1huwxev.mongodb.net/?retryWrites=true&w=majority'
}