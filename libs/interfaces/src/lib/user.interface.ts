export enum UserRole {
    STUDENT = 'Student',
    TEACHER = 'Teacher'
}

export interface IUser {
    _id?:string
    name:string
    role:UserRole,
    password?:string,
    email:string
}