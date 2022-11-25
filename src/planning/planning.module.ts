import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlanningSchema } from './entities/planning.entity';
import { PlanningMapperService } from './planning-mapper.service';
import { PlanningController } from './planning.controller';
import { PlanningService } from './planning.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Planning', schema: PlanningSchema }])],
  controllers: [PlanningController],
  providers: [PlanningService, PlanningMapperService],
})
export class PlanningModule {}
