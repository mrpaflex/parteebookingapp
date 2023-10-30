import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserDto } from 'src/user/dto/loginuser.dto';
import { AuthService } from './auth.service';
import { LoginVendorDto } from 'src/vendor/dto/login.vendor.dto';
import { LoginPlannerDto } from 'src/planner/dto/login.planner.dto';

@Controller('auth')
export class AuthController {

    constructor(private authservice: AuthService){}
    @Post('loginuser')
    loginuser(@Body() loginduserdto: LoginUserDto){
        return this.authservice.loginuser(loginduserdto)
    }

    @Post('loginvendor')
    loginvendor(@Body() loginvendordto: LoginVendorDto){
        return this.authservice.loginvendor(loginvendordto)
    }

    @Post('loginplanner')
    loginplanner(@Body() loginplannerdto: LoginPlannerDto){
        return this.authservice.loginplanner(loginplannerdto)
    }
}
