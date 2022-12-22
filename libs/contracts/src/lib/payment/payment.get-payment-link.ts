import { ICourse } from '@purple/interfaces';
import { IsEmail,IsNumber,IsString } from 'class-validator';

export namespace GetPaymentLinkCommand {
    export const topic = 'payment.get-payment-link.command'

    export class Request{
        @IsString()
        courseId:string;

        @IsString()
        userId:string;

        @IsNumber()
        price:number;
    }

    export class Response{
        paymentLink:string
    }
}