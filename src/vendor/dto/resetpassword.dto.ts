import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class ResetVendorPasswordDTO{

    
    email: string;
  
    token: string;
  
    
    newPassword: string;
    
    confirmedNewPassword: string
}