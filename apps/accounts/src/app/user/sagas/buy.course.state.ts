import { PurchaseState } from "@purple/interfaces";
import { UserEntity } from "../entities/user.entity";
import { buyCourseSage } from "./buy.course.saga";

export abstract class buyCourseState{
    public saga:buyCourseSage

    public setContext(saga:buyCourseSage){
        this.saga = saga
    }

    public abstract pay(): Promise<{paymentLink:string,user:UserEntity}>;
    public abstract canceled(): Promise<{user:UserEntity}>;
    public abstract waitForPayment():Promise<{user:UserEntity}>
}