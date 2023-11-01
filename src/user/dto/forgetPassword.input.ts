import { IsEmail, IsNotEmpty } from "class-validator";


export class ForgetUserPasswordDTO{
    @IsEmail()
    @IsNotEmpty()
    email: string
}