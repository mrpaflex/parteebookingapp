import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { VendorInput } from './input/vendor.input';
import { InjectRepository } from '@nestjs/typeorm';
import { VendorEntity } from './entities/vendor.entity';
import { Repository } from 'typeorm';
import { hashed } from 'src/common/hashed/util.hash';
import { UpdateVendorDto } from './input/update.vendor.input';
import { GraphQLError } from 'graphql';

@Injectable()
export class VendorService {
   
    
    
    constructor(@InjectRepository(VendorEntity)
    private vendorRepo: Repository<VendorEntity>
    ){}
    async vendorRegister(vendorinput: VendorInput) {
        const vendor = await this.vendorRepo.findOne({
            where:{
                email: vendorinput.email
            }
        })
        if(vendor){
            throw new HttpException('user already exist', HttpStatus.UNPROCESSABLE_ENTITY)
        }

        const createvendor = new VendorEntity();
        createvendor.bussineName= vendorinput.bussineName;
        createvendor.email= vendorinput.email;
        createvendor.firstName= vendorinput.firstName;
        createvendor.lastName= vendorinput.lastName;
        createvendor.password= await hashed(vendorinput.password)
        const savedVendor = await this.vendorRepo.save(createvendor)

        return savedVendor
        
    }

   async updatevendor(id: string, updatevendor: UpdateVendorDto) {
        const user = await this.vendorRepo.findOne({
            where:{
                id: id,
                approved: false,
                suspended: false
            }
        })
        if(user.approved === false){
            throw new GraphQLError('your account is not active yet')
        }
        const updatedUser = Object.assign(user, updatevendor)
        return await this.vendorRepo.save(updatedUser)
    }


    //searh for vendor
    async findallvendors() {
        const vendors = await this.vendorRepo.find({
            where:{
                approved: false,
                suspended:false
            }
        })
        return vendors
    }
}
