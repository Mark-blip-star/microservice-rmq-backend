import { PurchaseState } from "@purple/interfaces"
import { RMQService } from "nestjs-rmq"
import { UserEntity } from "../entities/user.entity"
import { buyCourseState } from "./buy.course.state";
import { buyCourseSageStart } from "./buy.course.steps";

export class buyCourseSage {
    state: buyCourseState

    constructor(public readonly userEntity: UserEntity, public rmqService: RMQService,public courseId:string) {

    }

    setState(state: PurchaseState, courseId: string) {
        switch (state) {
            case PurchaseState.STARTED:
                this.state = new buyCourseSageStart()
                break;
            case PurchaseState.CENCELED:
                break;
            case PurchaseState.WAIT_FOR_PAYMENT:
                break;
            case PurchaseState.PURCHASED:
                break;
        }
        this.state.setContext(this)
        this.userEntity.updateCourseStatus(courseId, state)
    }

    getState() {
        return this.state
    }
}