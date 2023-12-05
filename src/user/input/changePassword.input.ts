import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ChangePasswordDTO{

    @Field()
    password: string;
    
    @Field()
    confirmedPassword: string

    @Field()
    confirmedOldPassword: string

}