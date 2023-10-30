import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { VendorEntity } from './entities/vendor.entity';
import { VendorInput } from './input/vendor.input';
import { VendorService } from './vendor.service';
import { UpdateVendorDto } from './input/update.vendor.input';

@Resolver(of => VendorEntity)
export class VendorResolver {
    constructor(private vendorService: VendorService){}

    @Mutation(returns => VendorEntity)
    async vendorRegister(@Args('vendorinput') vendorinput: VendorInput){
        return await this.vendorService.vendorRegister( vendorinput)
    }

    @Mutation(returns => VendorEntity)
    updatevendor(@Args('id') id: string, @Args('updatevendorinput') updatevendor: UpdateVendorDto){
        return this.vendorService.updatevendor(id, updatevendor)
    }

    @Query(returns => [VendorEntity])
    findvendor(){
        return this.vendorService.findallvendors()
    }

}
