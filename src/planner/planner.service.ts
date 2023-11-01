import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PlanerInputDto } from './input/createplanner.input';
import { InjectRepository } from '@nestjs/typeorm';
import { PlannerEntity } from './entities/planner.entity';
import { Repository } from 'typeorm';
import { hashed } from 'src/common/hashed/util.hash';
import { updatePlannerDto } from './input/update.planner';
import { GraphQLError } from 'graphql';
import { ChangePlannerPasswordDTO } from './input/changePassword.planner';
import { ForgetPlannerPasswordDTO } from './dto/forgetpassword.dto';
import { ResetPlannerPasswordDTO } from './dto/resetpassword.dto';

import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class PlannerService {
    private transporter: nodemailer.Transporter;
 
    constructor(@InjectRepository(PlannerEntity)
    private plannerReposi: Repository<PlannerEntity>,
    private configService: ConfigService
    ){

        this.transporter = nodemailer.createTransport({
            host: configService.get('MAIL_HOST'),
            port: 2525,
            secure: false,
            auth: {
              user: configService.get('MAIL_USER'),
              pass: configService.get('MAIL_PASSWORD')
            },

            tls: {
                rejectUnauthorized: false // Accept self-signed certificates (for debugging)
            }
          });
    }

    async PlannerRegister(plannerinput: PlanerInputDto) {
        const planner = await this.plannerReposi.findOne({
            where:{
                email: plannerinput.email
            }
        })
        if(planner){
            throw new HttpException('user already exist', HttpStatus.UNPROCESSABLE_ENTITY)
        }

        const createplanner = new PlannerEntity();
        createplanner.businessName= plannerinput.businessName;
        createplanner.location = plannerinput.location;
        createplanner.email= plannerinput.email;
        createplanner.firstName= plannerinput.firstName;
        createplanner.lastName= plannerinput.lastName;
        createplanner.password= await hashed(plannerinput.password)
        const savedplanner = await this.plannerReposi.save(createplanner)

        return savedplanner
        
    }

   
    async updatePlanner(id: string, updateplanner: updatePlannerDto) {
        const planner = await this.plannerReposi.findOne({
            where:{
                id: id,
                suspended:false
            }

        })
        if (planner.approved === false) {
            throw new GraphQLError('your account is not active yet')
        }

        const updatedPlanner = Object.assign(planner, updateplanner)
        return await this.plannerReposi.save(updatedPlanner)
    }

    async findallplanner() {
        return await this.plannerReposi.find({
            where: {
                suspended: false,
                //approved: true
            }
        })
    }

    //change password

    async changePlannerPassword(id: string, changePlannerPassword: ChangePlannerPasswordDTO) {
        const planner = await this.plannerReposi.findOne({
            where:{
                id:id
            }
        })

        if (changePlannerPassword.password !== changePlannerPassword.confirmedPassword) {
            throw new GraphQLError('password not matched')
        }
        if(changePlannerPassword.password === planner.password){
            throw new GraphQLError('you can not change to same password')
        }

        planner.password = await hashed(changePlannerPassword.password)
        
        await this.plannerReposi.save(planner)
    }


    //real

    async  forgetPlannerPassword(input: ForgetPlannerPasswordDTO) {
        const planner = await this.plannerReposi.findOne({
            where:{
                email:input.email
            }
          })

          if (!planner) {
            throw new HttpException('email does not exit', HttpStatus.UNPROCESSABLE_ENTITY)
          }

          const generateResetToken = crypto.randomBytes(32).toString('hex');
          console.log(generateResetToken);

          const generateTokenExpirationTime = new Date()
          generateTokenExpirationTime.setHours(generateTokenExpirationTime.getHours()+1);

          planner.resetToken = generateResetToken;
          planner.resetTokenExpiration = generateTokenExpirationTime
          await this.plannerReposi.save(planner)

          const emailMessage ={
            from: 'ukosaviour21@gmail.com',
            to: input.email,
            subject: 'password Reset',
            Text: `Click the following link to reset your password: https://yourwebsite.com/reset-password?token=${generateResetToken}`
          }
    
          try {
            const info = await this.transporter.sendMail(emailMessage);
            return info;
          } catch (error) {
            throw new Error(error.message);
          } 
    }
    
    async resetPlannerPassword(input: ResetPlannerPasswordDTO) {
      const planner = await this.plannerReposi.findOne({
        where:{
            email:input.email
        }
      })

      if (!planner) {
        throw new HttpException('check your email spelling', HttpStatus.UNPROCESSABLE_ENTITY)
    }
    if (planner.resetToken !== input.token || planner.resetTokenExpiration < new Date()) {
        throw new Error('inavlid or expired reset token')
    }
    
    if (input.newPassword !== input.confirmedNewPassword) {
        throw new HttpException('password does not matched', HttpStatus.UNPROCESSABLE_ENTITY)
    }
    
    planner.password = await hashed(input.newPassword);
    planner.resetToken = null;
    planner.resetTokenExpiration = null;
    
    await this.plannerReposi.save(planner)
    
    }  
}
