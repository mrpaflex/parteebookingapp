import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserEntity } from 'src/user/entities/createuser.entity';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config'; 
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { confirmedUserEmailDTO } from 'src/user/dto/confirmedusermail.dto';
import { VendorEntity } from 'src/vendor/entities/vendor.entity';
import { PlannerEntity } from 'src/planner/entities/planner.entity';
import { confirmedVendorEmailDTO } from 'src/vendor/dto/confirmedVendorEmail.dto';
import { confirmedPlannerEmailDTO } from 'src/planner/dto/confirmedPlanner.dto';


@Injectable()
export class MailService {
    private transporter: nodemailer.Transporter;
    constructor(
        @InjectRepository(CreateUserEntity) private userRespos: Repository<CreateUserEntity>,

        @InjectRepository(VendorEntity) private vendorRespos: Repository<VendorEntity>,

        @InjectRepository(PlannerEntity) private plannerRespos: Repository<PlannerEntity>,

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

    //for user email confirmation
    async sendUserConfirmation(user: CreateUserEntity){
        // const emailtoken = Math.floor(1000 + Math.random() * 9000).toString();
        const emailtoken =crypto.randomBytes(32).toString('hex');
        const emailtTokenExpirationTime = new Date()
        emailtTokenExpirationTime.setDate(emailtTokenExpirationTime.getDate()+ 1);
        
        console.log(emailtoken)

        user.emailConfirmedToken = emailtoken
        user.emailTokenExpiration = emailtTokenExpirationTime
        await this.userRespos.save(user);

        const sendmail={
            from: 'ukosaviour21@gmail.com',
            to: user.email,
            subject: 'confirmed your email',
            Text: `Click the following link to reset your password: https://yourwebsite.com/reset-password?token=${emailtoken}`
        }
        try {
            const info = await this.transporter.sendMail(sendmail);
            return info;
          } catch (error) {
            throw new Error(error.message);
          }  
       
    }  


    //confirmed email token for Vendor
    async sendVendorConfirmation(vendor: VendorEntity){
        // const emailtoken = Math.floor(1000 + Math.random() * 9000).toString();
        const emailtoken =crypto.randomBytes(32).toString('hex');
        const emailtTokenExpirationTime = new Date()
        emailtTokenExpirationTime.setDate(emailtTokenExpirationTime.getDate()+ 1);
        
        console.log(emailtoken)

        vendor.emailConfirmedToken = emailtoken
        vendor.emailTokenExpiration = emailtTokenExpirationTime
        await this.vendorRespos.save(vendor);

        const sendmail={
            from: 'ukosaviour21@gmail.com',
            to: vendor.email,
            subject: 'confirmed your email',
            Text: `Click the following link to reset your password: https://yourwebsite.com/reset-password?token=${emailtoken}`
        }
        try {
            const info = await this.transporter.sendMail(sendmail);
            return info;
          } catch (error) {
            throw new Error(error.message);
          }  
       
    }


     //confirmed email token for Planner
     async sendPlannerConfirmation(planner: PlannerEntity){
        // const emailtoken = Math.floor(1000 + Math.random() * 9000).toString();
        const emailtoken =crypto.randomBytes(32).toString('hex');
        const emailtTokenExpirationTime = new Date()
        emailtTokenExpirationTime.setDate(emailtTokenExpirationTime.getDate()+ 1);
        
        console.log(emailtoken)

        planner.emailConfirmedToken = emailtoken
        planner.emailTokenExpiration = emailtTokenExpirationTime
        await this.plannerRespos.save(planner);

        const sendmail={
            from: 'ukosaviour21@gmail.com',
            to: planner.email,
            subject: 'confirmed your email',
            Text: `Click the following link to reset your password: https://yourwebsite.com/reset-password?token=${emailtoken}`
        }
        try {
            const info = await this.transporter.sendMail(sendmail);
            return info;
          } catch (error) {
            throw new Error(error.message);
          }  
       
    }

    //confirmed user email 
   async confirmedUserEmail(input: confirmedUserEmailDTO) {
        const user  = await this.userRespos.findOne({
            where:{
                email: input.email
            }
        })
        if (!user) {
            throw new HttpException('please check your email address', HttpStatus.UNPROCESSABLE_ENTITY)
        }
        if (user.emailConfirmedToken !== input.confirmedToken || user.emailTokenExpiration< new Date()) {
            throw new HttpException('wrong credential or token has expired', HttpStatus.UNPROCESSABLE_ENTITY)
        }
        user.emailConfirmed = true;
        user.emailConfirmedToken = null;
        user.emailTokenExpiration = null;

        await this.userRespos.save(user)

        return {
            info: 'you are now verified'
        }

    }

    //confirmed vendor email 
   async confirmedVendorEmail(input: confirmedVendorEmailDTO) {
        const vendor  = await this.vendorRespos.findOne({
            where:{
                email: input.email
            }
        })
        if (!vendor) {
            throw new HttpException('please check your email address', HttpStatus.UNPROCESSABLE_ENTITY)
        }
        if (vendor.emailConfirmedToken !== input.confirmedToken || vendor.emailTokenExpiration< new Date()) {
            throw new HttpException('wrong credential or token has expired', HttpStatus.UNPROCESSABLE_ENTITY)
        }
        vendor.emailConfirmed = true;
        vendor.emailConfirmedToken = null;
        vendor.emailTokenExpiration = null;

        await this.vendorRespos.save(vendor)

        return {
            info: 'you are now verified'
        }
     }

     async confirmedPlannerEmail(input: confirmedPlannerEmailDTO) {
        const planner  = await this.plannerRespos.findOne({
            where:{
                email: input.email
            }
        })
        if (!planner) {
            throw new HttpException('please check your email address', HttpStatus.UNPROCESSABLE_ENTITY)
        }
        if (planner.emailConfirmedToken !== input.confirmedToken || planner.emailTokenExpiration< new Date()) {
            throw new HttpException('wrong credential or token has expired', HttpStatus.UNPROCESSABLE_ENTITY)
        }
        planner.emailConfirmed = true;
        planner.emailConfirmedToken = null;
        planner.emailTokenExpiration = null;

        await this.plannerRespos.save(planner)

        return {
            info: 'you are now verified'
        }
     }
}