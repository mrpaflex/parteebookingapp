import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { CreateUserEntity } from 'src/user/entities/createuser.entity';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config'; 


@Injectable()
export class MailService {
    private transporter: nodemailer.Transporter;
    constructor(private configService: ConfigService){
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

    async sendUserConfirmation(user: CreateUserEntity){
        const token = Math.floor(1000 + Math.random() * 9000).toString();
       // const url = `example.com/auth/emailconfirmation=${token}`;
       const bb= await this.transporter.sendMail({
            from: 'ukosaviour21@gmail.com',
            to: user.email,
            subject: 'welcome to paatee',
            template: '/confirmation',
            text: `Click the following link to confirm your email: http://yourwebsite.com/confirm/${token}`,
            context:{
                name: user.firstName,
            }
            
        })
        return {
            info: 'email send, check your email'
        }
       
    }

    
}






