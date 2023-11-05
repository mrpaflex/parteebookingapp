import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductEntity } from './entities/product.entity';
import { CreateProductInput } from './input/createProducts.input';
import { ProductService } from './product.service';
import { UpdateProductsInput } from './input/updateProduct.input';
import { UseGuards } from '@nestjs/common';
//import { GqlAuthGuard } from 'src/auth/guards/graphql.guard';
import { GetCurrentGqlUser } from 'src/common/decorators/graphQl.decorator';
import { VendorEntity } from 'src/vendor/entities/vendor.entity';

@Resolver(of => ProductEntity)
export class ProductResolver {
    constructor(private productService: ProductService){}

    @Mutation(returns => ProductEntity)
    //@UseGuards(GqlAuthGuard)
    async createProducts(@Args('productInput') createProduct: CreateProductInput, @GetCurrentGqlUser()vendor: VendorEntity){
        return this.productService.createProducts(createProduct, vendor)
    }

    @Mutation(returns => ProductEntity)
    async updateProduct(@Args('id') id: string, @Args('updateproduct') updateproduct: UpdateProductsInput ){
        return await this.productService.updateproduct(id, updateproduct)
    }

    @Query(returns=> [ProductEntity])
    findProducts(){
        return this.productService.findProducts()
    }


    @Query(returns=> ProductEntity)
    findAProduct(@Args('id') id: string){
        return this.productService.findOneProduct(id)
    }

}
