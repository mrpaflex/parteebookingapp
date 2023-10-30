import { Module } from '@nestjs/common';
import { PlannerResolver } from './planner.resolver';
import { PlannerService } from './planner.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlannerEntity } from './entities/planner.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    PlannerEntity
  ])
  ],
  providers: [PlannerResolver, PlannerService]
})
export class PlannerModule {}
