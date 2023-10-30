import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "src/user/user.service";
require('dotenv').config();

export interface JwtPayload{
    user: string
  }
  
  @Injectable()
  export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authservice: AuthService, 
      private userRepo: UserService
      ) {
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: process.env.JWT_SECRET,
      });
    }
  
    ///no need checking
    async validate(payload: JwtPayload) {
     const user = await this.authservice.getUserjwt(payload.user);
     if (!user) {
          throw new UnauthorizedException();
  
     }
     return user
    }

    // async validated(payload: JwtPayload){
    //   const user = await this.userRepo.getUserjwt2(payload.user)
    //   if (!user) {
    //     throw new UnauthorizedException();
    //   }
    //   return user
    // }
  }