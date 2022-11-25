import { Injectable } from '@nestjs/common';
import { CreatePlanningDto } from './dto/create-planning.dto';
import { PlanningDto } from './dto/planning.dto';
import { Planning } from './entities/planning.entity';

@Injectable()
export class PlanningMapperService {
  public dtoToEntity(dto: PlanningDto | CreatePlanningDto): Planning {
    return (dto as PlanningDto)
      ? ({
          _id: (dto as PlanningDto).id,
          date: new Date(dto.date),
          horaire: dto.horaire,
        } as Planning)
      : undefined;
  }

  public dtosToEntities(dtos: PlanningDto[]): Planning[] {
    return Array.isArray(dtos) && dtos.length !== 0 ? dtos.filter(Boolean).map(this.dtoToEntity) : [];
  }

  public entityToDto(entity: Planning): PlanningDto {
    return entity
      ? ({
          id: entity._id,
          date: entity.date?.toISOString().substring(0, 10),
          horaire: entity.horaire,
        } as PlanningDto)
      : undefined;
  }

  public entitiesToDtos(entities: Planning[]): PlanningDto[] {
    return Array.isArray(entities) && entities.length !== 0 ? entities.filter(Boolean).map(this.entityToDto) : [];
  }
}
