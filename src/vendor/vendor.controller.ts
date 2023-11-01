import { Body, Controller, Post } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { ForgetVendorPasswordDTO } from './dto/forgetpassword.dto';
import { ResetVendorPasswordDTO } from './dto/resetpassword.dto';

@Controller('vendor')
export class VendorController {

    constructor(private vendprService: VendorService){}

    @Post('forgetpassword')
    forgetVendorPassword(@Body() input: ForgetVendorPasswordDTO){
        return this.vendprService.forgetVendorPassword(input)
        
    }

    @Post('resetpasssword')
     resetpassword(@Body() input: ResetVendorPasswordDTO){
        return  this.vendprService.resetVendorPassword(input)
    }

}
