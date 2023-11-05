import { Field, ObjectType } from "@nestjs/graphql";
import { BookingEntity } from "src/booking/entities/booking.entity";
import { ProductEntity } from "src/product/entities/product.entity";
import { BeforeInsert, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @Column({nullable: true})
    emailConfirmedToken: string;
    
    @Column({ type: 'timestamp', nullable: true })
    emailTokenExpiration: Date;

    @Column({ nullable: true })
    resetToken: string;

    @Column({ type: 'timestamp', nullable: true })
    resetTokenExpiration: Date;
  
    //relationship between users and what they are booking
    @OneToMany(()=> BookingEntity, (booking)=> booking.user)
    bookings: BookingEntity[]
  }