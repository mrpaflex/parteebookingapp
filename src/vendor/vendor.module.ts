import { Module } from '@nestjs/common';
import { VendorResolver } from './vendor.resolver';
import { VendorService } from './vendor.service';
import { VendorEntity } from './entities/vendor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([
    VendorEntity
  ])
  ],
  providers: [VendorResolver, VendorService]
})
export class VendorModule {}
