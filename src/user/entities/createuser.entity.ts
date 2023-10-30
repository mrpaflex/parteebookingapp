import { Field, ObjectType } from "@nestjs/graphql";
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
  
  }