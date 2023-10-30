import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

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
  @Column({default: 'wedding'})
  category: string;

  @Field()
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.0 })
  priceAmount: number;

  @Field()
  @Column({nullable: true })
  productDescription: string;

  @Field()
  @Column({nullable: true})
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

//   //relationship 
//   @ManyToOne(()=> VendorEntity, (vendor)=> vendor.products)
//   vendor: VendorEntity
}