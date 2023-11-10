import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, OneToMany, JoinTable } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { VendorEntity } from 'src/vendor/entities/vendor.entity';
import {Carts } from 'src/cart/entities/cart.entity';

@ObjectType()
@Entity('productstable')
export class ProductEntity {
  
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  productName: string;

  @Field()
  @Column()
  makeBy: string;

  @Field()
  @Column({default: 'wedding'})
  category: string;

  @Field()
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.0 })
  priceAmount: number;

  @Field()
  @Column({nullable: true })
  productDescription: string;

  @Field()
  @Column({nullable: true, default: ''})
  productImage: string;

  @Field()
  @Column({default: false, nullable: true })
  priceNegotiable: boolean;

  @Field()
  @Column({default: false})
  approved: boolean;


  @Column({default: false})
  deleted: boolean;

  
  @Field()
  @Column({type: 'timestamp', default: ()=> 'current_timestamp'})
  productUploadedDate: Date;

//relationship between product and vendor posting the product
  @ManyToOne(()=> VendorEntity, (vendor)=> vendor.products)
  vendor: VendorEntity

  //this is for bookin please
  // @ManyToMany(()=> BookingEntity, (booking)=> booking.product)
  // booking: BookingEntity

  //adding product to cart relationship
  @OneToMany(()=> Carts, (cart)=> cart.product)
  carts: Carts[]
  
}