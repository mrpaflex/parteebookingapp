import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { comparePassword } from 'src/common/hashed/util.hash';
import { LoginUserDto } from 'src/user/dto/loginuser.dto';
import { CreateUserEntity } from 'src/user/entities/createuser.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginVendorDto } from 'src/vendor/dto/login.vendor.dto';
import { VendorEntity } from 'src/vendor/entities/vendor.entity';
import { PlannerEntity } from 'src/planner/entities/planner.entity';
import { LoginPlannerDto } from 'src/planner/dto/login.planner.dto';

@Injectable()
export class AuthService {
  
 

    constructor(@InjectRepository(CreateUserEntity)
    private authRepository: Repository<CreateUserEntity>,
    @InjectRepository(VendorEntity)
    private vendorReposi: Repository<VendorEntity>,
    @InjectRepository(PlannerEntity)
    private plannerRepository: Repository<PlannerEntity>,
    private jwtservice: JwtService
    ){}
    
   async  loginuser(logindto: LoginUserDto) {
        const user = await this.authRepository.findOne({
            where:{
                email: logindto.email
            }
        })

        if(!user){
            throw new HttpException('check your information and try it again', HttpStatus.UNPROCESSABLE_ENTITY)
        }

        
        if((await comparePassword(logindto.password, user.password))===false){
            throw new HttpException('your password is incorrect', 422)
        }

        const payload = {
            user: user.id,
            firstname: user.firstName
         };
     
         return {
             accesstoken: this.jwtservice.sign(payload),
         }
        }
     

  

   async loginvendor(loginvendordto: LoginVendorDto) {
        const vendor = await this.vendorReposi.findOne({
            where:{
                email: loginvendordto.email
            }
        })
        if (!vendor) {
            throw new HttpException('check your credentials', HttpStatus.UNPROCESSABLE_ENTITY)
        }

        if((await comparePassword(loginvendordto.password, vendor.password))===false){
            throw new HttpException('your password is incorrect', 422)
        }

        const payload = {
            user: vendor.id,
            firstname: vendor.firstName
         };
     
         return {
             accesstoken: this.jwtservice.sign(payload),
         }

    }

    async loginplanner(loginplannerdto: LoginPlannerDto) {
        const planner = await this.plannerRepository.findOne({
            where:{
                email: loginplannerdto.email
            }

        })

        if (!planner) {
            throw new HttpException('check your credentials', HttpStatus.UNPROCESSABLE_ENTITY)
        }
         if((await comparePassword(loginplannerdto.password, planner.password))===false){
            throw new HttpException('your password is incorrect', 422)
        }
      
        const payload = {
            user: planner.id,
            firstname: planner.firstName
         };
     
         return {
             accesstoken: this.jwtservice.sign(payload),
         }
    }

    
      //very importance without this jwt can not grap the current logged in user
      //this function is call in strategy file check to understand
      async getUserjwt(id: string){
        const user = await this.authRepository.findOne({ where: {id: id}})
        const planner = await this.plannerRepository.findOne({ where:{id:id}})
        const vendor = await this.vendorReposi.findOne({ where:{id:id}})

        if (user) {
           return user;
        }
        if (planner) {
           return planner
        }
        if (vendor) {
           return vendor
        }

       
   }

}
