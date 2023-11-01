import { Module } from '@nestjs/common';
import { PlannerResolver } from './planner.resolver';
import { PlannerService } from './planner.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlannerEntity } from './entities/planner.entity';
import { PlannerController } from './planner.controller';
import { ConfigService } from '@nestjs/config';
import { MailService } from 'src/mail/mail.service';
import { VendorEntity } from 'src/vendor/entities/vendor.entity';
import { CreateUserEntity } from 'src/user/entities/createuser.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    VendorEntity,
    CreateUserEntity,
    PlannerEntity
  ])
  ],
  providers: [PlannerResolver,
    PlannerService,
    ConfigService,
    MailService
  ],
  exports: [PlannerService],
  controllers: [PlannerController]
})
export class PlannerModule {}
