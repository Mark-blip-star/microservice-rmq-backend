import { GetCourseQuery, GetPaymentLinkCommand } from "@purple/contracts";
import { PurchaseState } from "@purple/interfaces";
import { UserEntity } from "../entities/user.entity";
import {buyCourseState} from "../sagas/buy.course.state"

export class buyCourseSageStart extends buyCourseState{
    public async pay(): Promise<{ paymentLink: string; user: UserEntity; }> {
        const { course } = await this.saga.rmqService.send<GetCourseQuery.Request,GetCourseQuery.Response>(GetCourseQuery.topic,{
            courseId:this.saga.courseId
        })

        if(!course){
            throw new Error('Course does`t exist')
        }

        if(course.price === 0){
            this.saga.setState(PurchaseState.PURCHASED,course.id)
            return {
                paymentLink:null,
                user:this.saga.userEntity
            }
        }

        const {paymentLink} = await this.saga.rmqService.send<GetPaymentLinkCommand.Request,GetPaymentLinkCommand.Response>(GetPaymentLinkCommand.topic,{
            courseId:course.id,
            price:course.price,
            userId:this.saga.userEntity._id
        })
        
        return {
            paymentLink,
            user:this.saga.userEntity
        }
    }
    public canceled(): Promise<{ user: UserEntity; }> {
        throw new Error("Method not implemented.");
    }
    public async waitForPayment(): Promise<{ user: UserEntity; }> {
        this.saga.setState(PurchaseState.WAIT_FOR_PAYMENT,this.saga.courseId)
        return {
            user:this.saga.userEntity
        }
    }
}