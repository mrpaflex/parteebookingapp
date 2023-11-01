import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { VendorInput } from './input/vendor.input';
import { InjectRepository } from '@nestjs/typeorm';
import { VendorEntity } from './entities/vendor.entity';
import { Repository } from 'typeorm';
import { hashed } from 'src/common/hashed/util.hash';
import { UpdateVendorDto } from './input/update.vendor.input';
import { GraphQLError } from 'graphql';
import { ChangeVendorPasswordDTO } from './input/changeVendorPassword.input';
import { ForgetVendorPasswordDTO } from './dto/forgetpassword.dto';

import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import * as nodemailer from 'nodemailer';
import { ResetVendorPasswordDTO } from './dto/resetpassword.dto';

@Injectable()
export class VendorService {
   
    private transporter: nodemailer.Transporter;
    constructor(@InjectRepository(VendorEntity)
    private vendorRepo: Repository<VendorEntity>,
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
    async vendorRegister(vendorinput: VendorInput) {
        const vendor = await this.vendorRepo.findOne({
            where:{
                email: vendorinput.email
            }
        })
        if(vendor){
            throw new HttpException('user already exist', HttpStatus.UNPROCESSABLE_ENTITY)
        }

        const createvendor = new VendorEntity();
        createvendor.businessName= vendorinput.businessName;
        createvendor.email= vendorinput.email;
        createvendor.firstName= vendorinput.firstName;
        createvendor.lastName= vendorinput.lastName;
        createvendor.password= await hashed(vendorinput.password)
        const savedVendor = await this.vendorRepo.save(createvendor)

        return savedVendor
        
    }

   async updatevendor(id: string, updatevendor: UpdateVendorDto) {
        const user = await this.vendorRepo.findOne({
            where:{
                id: id,
                approved: false,
                suspended: false
            }
        })
        
        if(!user){
            throw new GraphQLError('id does not exist')
        }

        if (user.approved === true) {
            throw new GraphQLError('your account is not active yet')
        }
        
        const updatedVendor = Object.assign(user, updatevendor)
        return await this.vendorRepo.save(updatedVendor)
    }


    //searh for vendor
    async findallvendors() {
        const vendors = await this.vendorRepo.find({
            where:{
                approved: false,
                suspended:false
            }
        })
        return vendors
    }

    //change password
   async changeVendorPassword(id: string, changeVendorpassword: ChangeVendorPasswordDTO) {
        const vendor = await this.vendorRepo.findOne({
            where:{
                id: id
            }
        })

        if (changeVendorpassword.password !== changeVendorpassword.confirmedPassword) {
            throw new GraphQLError('check you password')
        }

        vendor.password =  await hashed(changeVendorpassword.password)
        await this.vendorRepo.save(vendor)
    }

    //real change of password
    async forgetVendorPassword(input: ForgetVendorPasswordDTO) {
      const vendor = await this.vendorRepo.findOne({
        where:{
            email: input.email
        }
      })
      if(!vendor){
        throw new HttpException('email does not exist', HttpStatus.UNPROCESSABLE_ENTITY)
      }
      const generateToeken = crypto.randomBytes(32).toString('hex');
      console.log(generateToeken)

      const resetTokenExpirationTime = new Date();
      resetTokenExpirationTime.setHours(resetTokenExpirationTime.getHours()+ 1);

      vendor.resetToken = generateToeken;
      vendor.resetTokenExpiration = resetTokenExpirationTime;
      await this.vendorRepo.save(vendor)

      const emailMessage ={
        from: 'ukosaviour21@gmail.com',
        to: input.email,
        subject: 'password Reset',
        Text: `Click the following link to reset your password: https://yourwebsite.com/reset-password?token=${generateToeken}`
      }

      try {
        const info = await this.transporter.sendMail(emailMessage);
        return info;
      } catch (error) {
        throw new Error(error.message);
      } 
    }

   async resetVendorPassword(input: ResetVendorPasswordDTO) {
        const vendor = await this.vendorRepo.findOne({
            where:{
                email:input.email
            }
          })
    
          if (!vendor) {
            throw new HttpException('check your email spelling', HttpStatus.UNPROCESSABLE_ENTITY)
        }
        if (vendor.resetToken !== input.token || vendor.resetTokenExpiration < new Date()) {
            throw new Error('inavlid or expired reset token')
        }
        
        if (input.newPassword !== input.confirmedNewPassword) {
            throw new HttpException('password does not matched', HttpStatus.UNPROCESSABLE_ENTITY)
        }
        
        vendor.password = await hashed(input.newPassword);
        vendor.resetToken = null;
        vendor.resetTokenExpiration = null;
        
        await this.vendorRepo.save(vendor)
        return {
            info: 'password change successfull'
        }
    }
}
