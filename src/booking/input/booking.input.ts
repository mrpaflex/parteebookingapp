import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty } from "class-validator";
import { ProductIdsInput } from "./productid.input";

@InputType()
export class BookingInput{
    @Field({nullable:true})
    @IsEmail()
    email: string;

    @Field()
    @IsNotEmpty()
    phoneNumber: string;

    @Field()
    @IsNotEmpty()
    eventDate: string;

    @Field()
    @IsNotEmpty()
    eventType: string;//this should be an enum

    @Field()
    @IsNotEmpty()
    eventLocation: string;

    @Field(() => ProductIdsInput)
    @IsNotEmpty()
    productId: ProductIdsInput
}