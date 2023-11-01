import { Module } from '@nestjs/common';
import { VendorResolver } from './vendor.resolver';
import { VendorService } from './vendor.service';
import { VendorEntity } from './entities/vendor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendorController } from './vendor.controller';
import { MailService } from 'src/mail/mail.service';
import { ConfigService } from '@nestjs/config';
import { CreateUserEntity } from 'src/user/entities/createuser.entity';
import { PlannerEntity } from 'src/planner/entities/planner.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    VendorEntity,
    CreateUserEntity,
    PlannerEntity
  ])
  ],
  providers: [
    VendorResolver, 
    VendorService,
    MailService,
    ConfigService
  
  ],
  exports: [VendorService],
  controllers: [VendorController]
})
export class VendorModule {}
