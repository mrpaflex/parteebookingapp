import { Injectable } from '@nestjs/common';
import { BookingInput } from './input/booking.input';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingEntity } from './entities/booking.entity';
import { In, Repository } from 'typeorm';
import { CreateUserEntity } from 'src/user/entities/createuser.entity';
import { ProductEntity } from 'src/product/entities/product.entity';
import { ProductIdsInput } from './input/productid.input';
import { GraphQLError } from 'graphql';
import { string } from 'joi';

@Injectable()
export class BookingService {
  

    constructor(@InjectRepository(BookingEntity)
    private bookiRepository: Repository<BookingEntity>,
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>
    ){}


async bookProduct(bookinginput: BookingInput, user: CreateUserEntity, productIds: string[]) {
    let productarray:any = []
    //const productarray: ProductEntity[]=[]

    const products = await this.productRepository.find({
        where:{
            id: In(productIds)
        }
    });

  
    // if(!products){
    //     throw new GraphQLError('you need to select a product')
    // }

   productarray.push(...products);

    if(!productarray || productarray.length === 0){
        throw new GraphQLError('you need to select a product')
    }


    const booked = new BookingEntity();
    booked.email = bookinginput.email;
    booked.phoneNumber= bookinginput.phoneNumber;
    booked.eventDate = bookinginput.eventDate;
    booked.eventType = bookinginput.eventType;
    booked.eventLocation = bookinginput.eventLocation;
    booked.user= user;
    booked.product = {...productarray}
    await this.bookiRepository.save(booked)
  
    console.log(booked)
        return booked
    
}
}

