import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { LoginUserDto } from 'src/user/dto/loginuser.dto';
import { AuthService } from './auth.service';
import { LoginVendorDto } from 'src/vendor/dto/login.vendor.dto';
import { LoginPlannerDto } from 'src/planner/dto/login.planner.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { GetRestApiCurrentUser } from 'src/common/decorators/restApiCustom.decorator';
import { CreateUserEntity } from 'src/user/entities/createuser.entity';
import { VendorEntity } from 'src/vendor/entities/vendor.entity';
import { PlannerEntity } from 'src/planner/entities/planner.entity';


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


  

    @Get('userprofile')
    @UseGuards(JwtAuthGuard)
    async currentUserLoginProfile(@GetRestApiCurrentUser() user: CreateUserEntity){
        return user;
    }

    @Get('vendorprofile')
    @UseGuards(JwtAuthGuard)
    async currentvendorLoginProfile(@GetRestApiCurrentUser() user: VendorEntity){
        return user;
    }

    @Get('plannerprofile')
    @UseGuards(JwtAuthGuard)
    async currentplannerLoginProfile(@GetRestApiCurrentUser() user: PlannerEntity){
        return user;
    }

   
}
