export enum UserRole {
    STUDENT = 'Student',
    TEACHER = 'Teacher'
}

export enum PurchaseState {
    STARTED = 'Started',
    WAIT_FOR_PAYMENT = 'WaitingForPayment',
    PURCHASED = 'Purchased',
    CENCELED = 'Cenceled'
}

export interface IUser {
    _id?:string
    name:string
    role:UserRole,
    password?:string,
    email:string
    courses?:IUserCourses[]
}

export interface IUserCourses{
    courseId:string,
    purchaseState:PurchaseState
}