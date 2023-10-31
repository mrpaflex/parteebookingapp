import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { VendorEntity } from './entities/vendor.entity';
import { VendorInput } from './input/vendor.input';
import { VendorService } from './vendor.service';
import { UpdateVendorDto } from './input/update.vendor.input';
import { ChangeVendorPasswordDTO } from './input/changeVendorPassword.input';

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
    findvendors(){
        return this.vendorService.findallvendors()
    }

    @Mutation(returns => VendorEntity)
    changevendorPassword(@Args('id') id: string, @Args('changevendorPassword') changeVendorpassword: ChangeVendorPasswordDTO){
        return this.vendorService.changeVendorPassword(id, changeVendorpassword)
    }

}
