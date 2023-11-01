import { Module } from '@nestjs/common';
import { VendorResolver } from './vendor.resolver';
import { VendorService } from './vendor.service';
import { VendorEntity } from './entities/vendor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendorController } from './vendor.controller';

@Module({
  imports: [TypeOrmModule.forFeature([
    VendorEntity
  ])
  ],
  providers: [VendorResolver, VendorService],
  controllers: [VendorController]
})
export class VendorModule {}
