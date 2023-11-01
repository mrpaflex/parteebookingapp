import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserEntity } from './entities/createuser.entity';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import { UserController } from './user.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([
    CreateUserEntity
  ])
  ],

  providers: [
    UserResolver, 
    UserService,
    JwtService,
    MailService,
    ConfigService

  ],

  controllers: [UserController]
})
export class UserModule {}
