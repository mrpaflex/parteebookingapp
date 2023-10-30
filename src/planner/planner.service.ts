import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PlanerInputDto } from './input/createplanner.input';
import { InjectRepository } from '@nestjs/typeorm';
import { PlannerEntity } from './entities/planner.entity';
import { Repository } from 'typeorm';
import { hashed } from 'src/common/hashed/util.hash';
import { updatePlannerDto } from './input/update.planner';
import { GraphQLError } from 'graphql';

@Injectable()
export class PlannerService {
 
    constructor(@InjectRepository(PlannerEntity)
    private plannerReposi: Repository<PlannerEntity>
    ){}

    async vPlannerRegister(plannerinput: PlanerInputDto) {
        const planner = await this.plannerReposi.findOne({
            where:{
                email: plannerinput.email
            }
        })
        if(planner){
            throw new HttpException('user already exist', HttpStatus.UNPROCESSABLE_ENTITY)
        }

        const createplanner = new PlannerEntity();
        createplanner.businessName= plannerinput.businessName;
        createplanner.location = plannerinput.location;
        createplanner.email= plannerinput.email;
        createplanner.firstName= plannerinput.firstName;
        createplanner.lastName= plannerinput.lastName;
        createplanner.password= await hashed(plannerinput.password)
        const savedplanner = await this.plannerReposi.save(createplanner)

        return savedplanner
        
    }

   
    async updatevendor(id: string, updateplanner: updatePlannerDto) {
        const planner = await this.plannerReposi.findOne({
            where:{
                id: id,
                suspended:false
            }

        })
        if (planner.approved === false) {
            throw new GraphQLError('your account is not active yet')
        }

        const updatedPlanner = Object.assign(planner, updateplanner)
        return await this.plannerReposi.save(updatedPlanner)
    }

    async findallplanner() {
        return await this.plannerReposi.find({
            where: {
                suspended: false,
                approved: true
            }
        })
    }
}
