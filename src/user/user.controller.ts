import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ForgetUserPasswordDTO } from './dto/forgetPassword.input';
import { ResetPasswordDTO } from './dto/resetPassword.input';
import { confirmedUserEmailDTO } from './dto/confirmedusermail.dto';

@Controller('user')
export class UserController {
constructor(private userService: UserService){}


@Post('forgetpassword')
async forgetUserPassword(@Body() input: ForgetUserPasswordDTO){
     return this.userService.forgetUserPassword(input)
 }

 
@Post('resetpassword')
async resetPassword(@Body() input: ResetPasswordDTO){
    return this.userService.resetPassword(input)
 }

 

}
