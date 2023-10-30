import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserEntity } from './entities/createuser.entity';
import { CreateUserInput } from './input/createuser.input.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './input/updateuser.input';
import { MailService } from 'src/mail/mail.service';

@Resolver(of=> CreateUserEntity)
export class UserResolver {

    constructor(private userservice: UserService,
        private mailService: MailService
        ){}
    
    @Mutation(returns => CreateUserEntity)
   async createuser(@Args('createuserinput') createUserinput: CreateUserInput):Promise<any>{

        const user = await this.userservice.createuser(createUserinput)
        await this.mailService.sendUserConfirmation(user)
        return user
    }

    @Mutation(returns=> CreateUserEntity)
    updateuser(@Args('id')id: string,
    @Args('updateuser') updateuser: UpdateUserDto
    ){
        return this.userservice.updateUser(id, updateuser)
    }

    @Query(returns => [CreateUserEntity])
    findusers(){
        return this.userservice.findalluser()
    }

}
