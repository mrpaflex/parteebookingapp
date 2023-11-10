import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Carts } from './entities/cart.entity';
import { CartService } from './cart.service';
import { GqlAuthGuard } from 'src/auth/guards/graphql.guard';
import { UseGuards } from '@nestjs/common';
import { AddToCartInput } from './input/cart.input';
import { GetCurrentGqlUser } from 'src/common/decorators/graphQl.decorator';
import { CreateUserEntity } from 'src/user/entities/createuser.entity';

@Resolver()
export class CartResolver {

    constructor(private cartService: CartService){}

@Mutation(of => Carts)
@UseGuards(GqlAuthGuard)
async addtoCart(@Args('addtocart') addtocartInput: AddToCartInput, @GetCurrentGqlUser() user: CreateUserEntity ){

   return this.cartService.addToCart(addtocartInput, user)

}

}
