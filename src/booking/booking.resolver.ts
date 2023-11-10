import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { BookingEntity } from './entities/booking.entity';
import { BookingInput } from './input/booking.input';
import { GqlAuthGuard } from 'src/auth/guards/graphql.guard';
import { UseGuards } from '@nestjs/common';
import { CreateUserEntity } from 'src/user/entities/createuser.entity';
import { GetCurrentGqlUser } from 'src/common/decorators/graphQl.decorator';
import { BookingService } from './booking.service';

@Resolver()
export class BookingResolver {
    constructor(private bookingService: BookingService){}
    @Mutation(of=> BookingEntity)
    @UseGuards(GqlAuthGuard)
    async createBooking( @Args('createbooking') bookinginput: BookingInput, @GetCurrentGqlUser() user: CreateUserEntity){

        const { productId } = bookinginput;

        return this.bookingService.bookProduct( bookinginput, user, productId.productIds)
    }
}
