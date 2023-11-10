import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class AddToCartInput{

    @Field()
    @IsNotEmpty()
    productId: string;

    @Field({nullable: true})
    quantity: number;

}