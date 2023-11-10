// import { Injectable } from '@nestjs/common';
// import { CreateUserEntity } from 'src/user/entities/createuser.entity';
// import { AddToCartInput } from './input/cart.input';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Carts } from './entities/cart.entity';
// import { In, Repository } from 'typeorm';
// import { ProductEntity } from 'src/product/entities/product.entity';
// import { GraphQLError } from 'graphql';

// @Injectable()
// export class CartService {

//     constructor(@InjectRepository(Carts)
//     private cartRepository: Repository<Carts>,

//     @InjectRepository(ProductEntity)
//     private productRepository: Repository<ProductEntity>
//     ){}


//     async addtoCart(addtocartInput: AddToCartInput, user: CreateUserEntity):Promise<Carts> {
//         let itemsArray:any = []

//         const item = await this.productRepository.findOne({
//             where:{
//                 id: In(addtocartInput.productId)
//             }
//         })

        
//         itemsArray.push(item)

//        if (!itemsArray || itemsArray.length === 0) {
//         throw new GraphQLError(`you don\'t have any item in the cart`)
//        }

//        const items = new Carts();
//        items.quantity = addtocartInput.quantity;
//        items.product= itemsArray
//        items.user = user

//        const addedItems = await this.cartRepository.save(items)
//        return addedItems

//     }
// }

import { GraphQLError } from 'graphql';
import { In, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Carts } from './entities/cart.entity';
import { ProductEntity } from 'src/product/entities/product.entity';
import { AddToCartInput } from './input/cart.input';
import { CreateUserEntity } from 'src/user/entities/createuser.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Carts)
    private cartRepository: Repository<Carts>,
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async addToCart(addToCartInput: AddToCartInput, user: CreateUserEntity): Promise<Carts> {
    //const itemsArray:any = [];

    const item = await this.productRepository.findOne({
      where: {
        id: addToCartInput.productId,
      },
    });

    if (!item) {
      throw new GraphQLError(`Product with id ${addToCartInput.productId} not found.`);
    }

    //itemsArray.push(item);

    const cart = new Carts();
    cart.quantity = addToCartInput.quantity;
    cart.product = item;
    cart.user = user;

    const addedItems = await this.cartRepository.save(cart);
    return addedItems;
  }
}

