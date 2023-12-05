import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserInput } from './input/createuser.input.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserEntity } from './entities/createuser.entity';
import { Repository } from 'typeorm';
import { GraphQLError } from 'graphql';
import { comparePassword, hashed } from 'src/common/hashed/util.hash';
import { MailService } from 'src/mail/mail.service';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './input/updateuser.input';
import { AuthService } from 'src/auth/auth.service';
import { ChangePasswordDTO } from './input/changePassword.input';
import { ForgetUserPasswordDTO } from './dto/forgetPassword.input';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import * as nodemailer from 'nodemailer';
import { ResetPasswordDTO } from './dto/resetPassword.input';



@Injectable()
export class UserService {
  
    private transporter: nodemailer.Transporter;
  
    constructor(@InjectRepository(CreateUserEntity) 
    private userepository: Repository<CreateUserEntity>,
    private jwtService: JwtService,
    private mailService: MailService,
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

    async createuser(createUserinput: CreateUserInput) {
       
        const user = await this.userepository.findOne({
            where: {
                email: createUserinput.email
            }
        })
        if(user){
            throw new GraphQLError('user with same information already exist')
        }
        const createUser = new CreateUserEntity();
        createUser.email = createUserinput.email;
        createUser.firstName = createUserinput.firstName;
        createUser.lastName = createUserinput.lastName;
        createUser.password = await hashed(createUserinput.password);
        createUser.phoneNumber = createUserinput.phoneNumber

        const savedUser = await this.userepository.save(createUser);
      
        return savedUser
       
    }

 
    async findalluser() {
        return await this.userepository.find();
    }

  
  async  updateUser(id: string, updateuser: UpdateUserDto) {
        const user = await this.userepository.findOne({
            where:{
                id: id,
                verified: false
            }
        })

        const updatedeuser = Object.assign(user, updateuser);

        await this.userepository.save(updatedeuser)
        return updatedeuser
    }

// user change old password to new password
async changeUserPassword(id: string, userChangepassword: ChangePasswordDTO) {
   const user = await this.userepository.findOne({
    where:{
        id:id,
    }
   })
   

   
if (await comparePassword(userChangepassword.confirmedOldPassword, user.password) === false) {
    throw new GraphQLError('your confirmed old password does not matched')
}

if(userChangepassword.password !== userChangepassword.confirmedPassword){
    throw new GraphQLError('password and confirmed password do not matched')
   }

     user.password = await hashed(userChangepassword.password)

     const updatedPassword = Object.assign(user, userChangepassword);

   //await this.userepository.save(user)
   return updatedPassword
}

//this is the real one

async  forgetUserPassword(input: ForgetUserPasswordDTO) {
    const user = await this.userepository.findOne({
        where:{
            email: input.email
        }
    })

    if (!user) {
        throw new HttpException('this email does not exist', HttpStatus.UNPROCESSABLE_ENTITY)
    }
    //process with send link or token to the user
    const generateResetToken = crypto.randomBytes(32).toString('hex');

    console.log(generateResetToken)
    const resetTokenExpiration = new Date();
    resetTokenExpiration.setHours(resetTokenExpiration.getHours()+ 1);
    
    user.resetToken = generateResetToken;
    user.resetTokenExpiration = resetTokenExpiration
    await this.userepository.save(user);

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

//user reset password link
async resetPassword(input: ResetPasswordDTO) {
const user = await this.userepository.findOne({
    where:{
        email: input.email
    }
})

if (!user) {
    throw new HttpException('check your email spelling', HttpStatus.UNPROCESSABLE_ENTITY)
}
if (user.resetToken !== input.token || user.resetTokenExpiration < new Date()) {
    throw new Error('inavlid or expired reset token')
}

if (input.newPassword !== input.confirmedNewPassword) {
    throw new HttpException('password does not matched', HttpStatus.UNPROCESSABLE_ENTITY)
}

user.password = await hashed(input.newPassword);
user.resetToken = null;
user.resetTokenExpiration = null;

await this.userepository.save(user)
return {
    info: 'password change successfull'
}
}

}

