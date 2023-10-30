import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PlannerEntity } from './entities/planner.entity';
import { PlanerInputDto } from './input/createplanner.input';
import { PlannerService } from './planner.service';
import { updatePlannerDto } from './input/update.planner';

@Resolver(of => PlannerEntity)
export class PlannerResolver {

    constructor(private plannerService: PlannerService){}

    
    @Mutation(returns => PlannerEntity)
    async plannerRegister(@Args('plannerinput') plannerinput: PlanerInputDto){
        return await this.plannerService.vPlannerRegister( plannerinput)
    }

    @Mutation(returns => PlannerEntity)
    updatevendor(@Args('id') id: string, @Args('updateplannerinput') updateplanner: updatePlannerDto){
        return this.plannerService.updatevendor(id, updateplanner)
    }

    @Query(returns => [PlannerEntity])
    findvendor(){
        return this.plannerService.findallplanner()
    }

}
