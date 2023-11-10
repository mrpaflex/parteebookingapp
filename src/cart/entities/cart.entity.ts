import { Field, ObjectType } from "@nestjs/graphql";
import { ProductEntity } from "src/product/entities/product.entity";
import { CreateUserEntity } from "src/user/entities/createuser.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity('addToCartTable')
export class Carts{
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column({ type: 'int', default: 1 })
    quantity: number

   @ManyToOne(()=> ProductEntity, (product)=> product.carts)
   product: ProductEntity

   @ManyToOne(()=> CreateUserEntity, (user)=> user.carts)
   user: CreateUserEntity

}