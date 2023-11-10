import { Module } from '@nestjs/common';
import { CartResolver } from './cart.resolver';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carts } from './entities/cart.entity';
import { ProductEntity } from 'src/product/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Carts,
    ProductEntity
  
  ])],
  providers: [CartResolver, CartService],
  controllers: [CartController]
})
export class CartModule {}
