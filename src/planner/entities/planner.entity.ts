import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@ObjectType()
@Entity('plannertable')
export class PlannerEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
    @Column()
    email: string;

    @Field()
    @Column()
    firstName: string;

    @Field()
    @Column()
    lastName: string;

    @Field()
    @Column()
    password: string;

  @Field()
  @Column()
  businessName: string;


  @Field()
  @Column({default: false})
  approved: boolean;

  @Field()
  @Column()
  location: string;

  
  @Field()
  @Column({nullable: true, default: ''})
  categories: string

  @Field()
  @Column({ nullable: true, default: '' })
  years_of_Experience: string;

  @Field()
  @Column({ nullable: true, default: '' })
  profilePicture: string;

  @Field()
  @Column({ nullable: true, default: '' })
  plannerPhoneNumber: string;

  @Field()
  @Column({type: 'timestamp', default: ()=> 'current_timestamp'})
  dateRegistered: Date;

  @Column({ default: false })
    suspended: boolean;

}