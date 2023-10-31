import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PlannerEntity } from './entities/planner.entity';
import { PlanerInputDto } from './input/createplanner.input';
import { PlannerService } from './planner.service';
import { updatePlannerDto } from './input/update.planner';
import { ChangePlannerPasswordDTO } from './input/changePassword.planner';

@Resolver(of => PlannerEntity)
export class PlannerResolver {

    constructor(private plannerService: PlannerService){}

    
    @Mutation(returns => PlannerEntity)
    async plannerRegister(@Args('plannerinput') plannerinput: PlanerInputDto){
        return await this.plannerService.PlannerRegister( plannerinput)
    }

    @Mutation(returns => PlannerEntity)
    updatePlanner(@Args('id') id: string, @Args('updateplannerinput') updateplanner: updatePlannerDto){
        return this.plannerService.updatePlanner(id, updateplanner)
    }

    @Query(returns => [PlannerEntity])
    findplanners(){
        return this.plannerService.findallplanner()
    }

    @Mutation(returns => PlannerEntity)
    async changePlannerPassword(@Args('id') id: string, @Args('chnagePlannerPassword') changePlannerPassword: ChangePlannerPasswordDTO){
        return this.plannerService.changePlannerPassword(id, changePlannerPassword)
    }

}
