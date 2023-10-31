import { Field, ObjectType } from "@nestjs/graphql";
import { ProductEntity } from "src/product/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
  @Entity('vendortable')
  export class VendorEntity {
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
    @Column({ default: false })
    approved: boolean;
  
    @Field()
    @Column({ type: 'timestamp', default: () => 'current_timestamp' })
    dateRegistered: Date;

    @Field()
  @Column({nullable: true, default: ''})
  location: string;

  @Field()
  @Column({nullable: true, default: ''})
  category: string;

  @Field()
  @Column({ nullable: true, default: '' })
  years_of_Experience: string;

  @Field()
  @Column({ nullable: true, default: '' })
  profilePicture: string;

  @Field()
  @Column({default: '', nullable: true}) 
  businessPhone: string;
  
    @Column({ default: false })
    suspended: boolean;
  
    //relationship
     //one to many relations
  @OneToMany(() => ProductEntity , (product) => product.vendor)
  products:ProductEntity[];

  }
  