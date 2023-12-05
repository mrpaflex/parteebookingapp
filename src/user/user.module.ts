import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserEntity } from './entities/createuser.entity';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import { UserController } from './user.controller';
import { ConfigService } from '@nestjs/config';
import { VendorEntity } from 'src/vendor/entities/vendor.entity';
import { PlannerEntity } from 'src/planner/entities/planner.entity';
import { StatusController } from './status.controller';

@Module({
  imports: [TypeOrmModule.forFeature([
    VendorEntity,
    CreateUserEntity,
    PlannerEntity
    
  ])
  ],

  providers: [
    UserResolver, 
    UserService,
    JwtService,
    MailService,
    ConfigService,
  ],
  exports: [UserService],
  controllers: [UserController, StatusController]
})
export class UserModule {}
