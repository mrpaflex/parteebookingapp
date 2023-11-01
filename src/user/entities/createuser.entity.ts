import { Field, ObjectType } from "@nestjs/graphql";
import { ProductEntity } from "src/product/entities/product.entity";
import { BeforeInsert, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

  @ObjectType()
  @Entity('usertable')
  export class CreateUserEntity {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column()
    firstName: string;

    @Field()
    @Column()
    lastName: string;
  
    @Field()
    @Column()
    email: string;
  
    @Field()
    @Column()
    phoneNumber: string;
  
    @Field()
    @Column()
    password: string;
  
    @Field()
    @Column({default: false})
    verified: boolean;

    @Column({ default: false })
    emailConfirmed: boolean;

    @Column({ nullable: true })
    resetToken: string;

    @Column({ type: 'timestamp', nullable: true })
    resetTokenExpiration: Date;
  

    // @ManyToMany(()=> ProductEntity, (products) => products.user)

    // products: ProductEntity[]

  }