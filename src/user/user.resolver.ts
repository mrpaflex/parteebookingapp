import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserEntity } from './entities/createuser.entity';
import { CreateUserInput } from './input/createuser.input.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './input/updateuser.input';
import { MailService } from 'src/mail/mail.service';
import { ChangePasswordDTO } from './input/changePassword.input';
import { ForgetUserPasswordDTO } from './dto/forgetPassword.input';
import { ResetPasswordDTO } from './dto/resetPassword.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/graphql.guard';
import { GetCurrentGqlUser } from 'src/common/decorators/graphQl.decorator';

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
     

    // @Mutation(returns => CreateUserEntity)
    // @UseGuards(GqlAuthGuard)
    // async userChnagePassword(@Args('id') id: string, @Args('userchangePasswordinput') userChangepassword: ChangePasswordDTO){
    //     return await this.userservice.changeUserPassword(id, userChangepassword)

    // }

    @Mutation(returns => CreateUserEntity)
    @UseGuards(GqlAuthGuard)
    async userChnagePassword(@GetCurrentGqlUser()user: CreateUserEntity, @Args('userchangePasswordinput') userChangepassword: ChangePasswordDTO){
        return await this.userservice.changeUserPassword(user, userChangepassword)

    }

    @Query(returns => [CreateUserEntity])
    findusers(){
        return this.userservice.findalluser()
    }

   


}
