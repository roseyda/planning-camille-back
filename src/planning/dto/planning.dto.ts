import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreatePlanningDto } from './create-planning.dto';

export class PlanningDto extends CreatePlanningDto {
  @ApiProperty()
  @IsNotEmpty()
  id: string;
}
