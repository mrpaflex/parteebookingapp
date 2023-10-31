import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './input/createProducts.input';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { UpdateProductsInput } from './input/updateProduct.input';
import { GraphQLError } from 'graphql';
import { VendorEntity } from 'src/vendor/entities/vendor.entity';

@Injectable()
export class ProductService {
   
   
    
   
    constructor(@InjectRepository(ProductEntity)
    private productReposi: Repository<ProductEntity>
    ){}


   async createProducts(createProduct: CreateProductInput, vendor: VendorEntity) {

    //image will here
        const product = new ProductEntity()
        product.productName= createProduct.productName;
        product.makeBy= createProduct.makeBy;
        product.category = createProduct.category;
        product.priceAmount = createProduct.priceAmount;//do some mathematics
        product.priceNegotiable= createProduct.priceNegotiable;
        product.productDescription= createProduct.productDescription;
        product.productImage= createProduct.productImage
        product.vendor = vendor

        const savedProducts = await this.productReposi.save(product)
        return savedProducts;

    }

   async updateproduct(id: string, updateproduct: UpdateProductsInput) {
    const product = await this.productReposi.findOne({
        where:{
            id:id
        }
    })
    if(product.deleted === true){
        throw new GraphQLError('product can not found')
    }

    const updateproducted = Object.assign(product, updateproduct);
    return await this.productReposi.save(updateproducted)

    }

    async findProducts() {
        return await this.productReposi.find({
            where:{
                deleted: false,
                //approved: true
            }
        })
    }

    async findOneProduct(id: string) {
       const product = await this.productReposi.findOne({
        where:{
            id:id,
            deleted: false
        }
       })
            if (!product) {
                throw new GraphQLError('product with such id does not exist, pleasr try again')
            }
                return product
    }
}
