import { ICourse } from '@purple/interfaces';
import { IsEmail,IsString } from 'class-validator';

export namespace GetCourseQuery {
    export const topic = 'course.get-course.query'

    export class Request{
        @IsString()
        courseId:string;
    }

    export class Response{
        course:ICourse
    }
}