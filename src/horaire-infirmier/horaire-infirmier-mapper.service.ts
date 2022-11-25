import { Injectable } from '@nestjs/common';
import { HoraireInfirmierDto } from './dto/horaire-infirmier.dto';
import { HoraireInfirmier } from './entities/horaire-infirmier.entity';

@Injectable()
export class HoraireInfirmierMapperService {
  public dtoToEntity(dto: HoraireInfirmierDto): HoraireInfirmier {
    return dto
      ? ({
          _id: dto.id,
          name: dto.name,
          color: dto.color,
        } as HoraireInfirmier)
      : undefined;
  }

  public dtosToEntities(dtos: HoraireInfirmierDto[]): HoraireInfirmier[] {
    return Array.isArray(dtos) && dtos.length !== 0 ? dtos.filter(Boolean).map(this.dtoToEntity) : [];
  }

  public entityToDto(entity: HoraireInfirmier): HoraireInfirmierDto {
    return entity
      ? ({
          id: entity._id,
          name: entity.name,
          color: entity.color,
        } as HoraireInfirmierDto)
      : undefined;
  }

  public entitiesToDtos(entities: HoraireInfirmier[]): HoraireInfirmierDto[] {
    return Array.isArray(entities) && entities.length !== 0 ? entities.filter(Boolean).map(this.entityToDto) : [];
  }
}
