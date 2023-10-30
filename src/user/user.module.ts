import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserEntity } from './entities/createuser.entity';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([
    CreateUserEntity
  ])
  ],

  providers: [
    UserResolver, 
    UserService,
    JwtService,
    MailService

  ]
})
export class UserModule {}
