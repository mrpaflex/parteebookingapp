import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty } from "class-validator";

@InputType()
export class CreateUserInput {
  @Field()
  @IsNotEmpty()
  firstName: string;
  
  @Field()
  @IsNotEmpty()
  lastName: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  phoneNumber: string;

  @Field()
//   @MaxLength(50, {
//     message: 'Password must not exceed 50 characters.',
//   })
//   @IsStrongPassword(
//     {
//       minLength: 6,
//       minNumbers: 1,
//       minSymbols: 1,
//       minLowercase: 1,
//       minUppercase: 1,
//     },
//     {
//       message:
//         'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character.',
//     },
//   )
  password: string;
}