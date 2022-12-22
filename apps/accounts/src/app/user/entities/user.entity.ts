import { IUser, IUserCourses, PurchaseState, UserRole } from "@purple/interfaces";
import {genSalt,hash,compare} from "bcrypt"

export class UserEntity implements IUser{
    _id?: string;
    role: UserRole;
    password: string;
    email: string;
    name:string
    courses:IUserCourses[]

    constructor(user:IUser){
        this._id = user._id
        this.email = user.email
        this.name = user.name
        this.password = user.password
        this.role = user.role
        this.courses = user.courses
    }

    public addUserCourse(courseId:string){
        const exist = this.courses.find(c => c.courseId === courseId)
        if(exist){
            throw new Error('Course already purchased')
        }
        this.courses.push({
            courseId,
            purchaseState:PurchaseState.STARTED
        })
    }   

    public deleteUserCourse(courseId:string){
        this.courses.filter(c => c.courseId !== courseId)
    }

    public updateCourseStatus(courseId:string,state:PurchaseState){
        this.courses = this.courses.map(c => {
            if(c.courseId === courseId){
                c.purchaseState = state
                return c
            }
            return c
        })
    }

    public async setPassword(password:string){
        const salt = await genSalt(4)
        this.password = await hash(password,salt)
        return this
    }

    public async changeUserName(newName:string){
        this.name = newName
        return this
    }

    public async comparePassword(password:string){
        return await compare(password,this.password)
    }
}