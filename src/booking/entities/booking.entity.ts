import { Field, ObjectType } from "@nestjs/graphql";
import { ProductEntity } from "src/product/entities/product.entity";
import { CreateUserEntity } from "src/user/entities/createuser.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity('bookingtable')
export class BookingEntity{

    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field()
    @Column({nullable: true})
    email: string;

    @Field()
    @Column()
    phoneNumber: string;

    @Field()
    @Column()
    eventDate: string;

    @Field()
    @Column()
    eventType: string;

    @Field()
    @Column()
    eventLocation: string;

    @Field()
    @Column({type: 'timestamp', default: ()=> 'current_timestamp'})
    bookingDate: Date;

    @ManyToOne(()=> ProductEntity, (product)=>product.booking)
    product: ProductEntity;

    @ManyToOne(()=> CreateUserEntity, (user)=>user.bookings)
    user: CreateUserEntity

}