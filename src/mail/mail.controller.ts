import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { confirmedUserEmailDTO } from 'src/user/dto/confirmedusermail.dto';
import { confirmedVendorEmailDTO } from 'src/vendor/dto/confirmedVendorEmail.dto';
import { confirmedPlannerEmailDTO } from 'src/planner/dto/confirmedPlanner.dto';
import { verifyEmailDto } from './dto/verifty.email.dto';

@Controller('mail')
export class MailController {
    constructor(private mailService: MailService){}

//     @Post('confirmeduseremail')
//  async confirmedUserEmailToken(@Body() input: confirmedUserEmailDTO){
//     return this.mailService.confirmedUserEmail(input)
//  }

//  @Post('confirmedvendoremail')
//  async confirmedVendorEmailToken(@Body() input: confirmedVendorEmailDTO){
//     return this.mailService.confirmedVendorEmail(input)
//  }

//  @Post('confirmedplanneremail')
//  async confirmedPlannerEmail(@Body() input: confirmedPlannerEmailDTO){
//     return this.mailService.confirmedPlannerEmail(input)
//  }

 @Post('verifyemail')
 async verifyemail(@Body() input: verifyEmailDto){
   return this.mailService.verifyemail(input)
 }
}


