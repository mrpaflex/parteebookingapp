import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './input/createuser.input.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserEntity } from './entities/createuser.entity';
import { Repository } from 'typeorm';
import { GraphQLError } from 'graphql';
import { hashed } from 'src/common/hashed/util.hash';
import { MailService } from 'src/mail/mail.service';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './input/updateuser.input';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
   
   
   
    constructor(@InjectRepository(CreateUserEntity) 
    private userepository: Repository<CreateUserEntity>,
    private jwtService: JwtService,
    private mailService: MailService
    
    ){}
    async createuser(createUserinput: CreateUserInput) {
       
        const user = await this.userepository.findOne({
            where: {
                email: createUserinput.email
            }
        })
        if(user){
            throw new GraphQLError('user with same information already exist')
        }
        const createUser = new CreateUserEntity();
        createUser.email = createUserinput.email;
        createUser.firstName = createUserinput.firstName;
        createUser.lastName = createUserinput.lastName;
        createUser.password = await hashed(createUserinput.password);
        createUser.phoneNumber = createUserinput.phoneNumber

        const savedUser = await this.userepository.save(createUser);
      
        return savedUser
       
    }

 
    async findalluser() {
        return await this.userepository.find();
    }

    //confirma email

    // async condirmedUser(id: string){
    // const payload = this.jwtService.verify(id);
    // const email = payload.email

    // const user = await this.userepository.findOne({
    //     where:{
    //         email: email
    //     }
    // })

    // if (user) {
    //     user.emailConfirmed = true;
    //     await this.updateUser(id, user)
    //     return user
    // }

    // }

  async  updateUser(id: string, updateuser: UpdateUserDto) {
        const user = await this.userepository.findOne({
            where:{
                id: id,
                verified: false
            }
        })

        const updatedeuser = Object.assign(user, updateuser);

        await this.userepository.save(updatedeuser)
        return updatedeuser
    }

//     async getUserjwt2(id: string){
//         const user = await this.userepository.findOne({
//             where:{
//                 id: id
//             }
//         })
//         return user;
//    }

}

