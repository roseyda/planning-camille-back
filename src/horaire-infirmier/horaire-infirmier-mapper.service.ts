import { Injectable } from '@nestjs/common';
import { CreateHoraireInfirmierDto } from './dto/create-horaire-infirmier.dto';
import { HoraireInfirmierDto } from './dto/horaire-infirmier.dto';
import { HoraireInfirmier } from './entities/horaire-infirmier.entity';

@Injectable()
export class HoraireInfirmierMapperService {
  public dtoToEntity(dto: HoraireInfirmierDto | CreateHoraireInfirmierDto): HoraireInfirmier {
    return dto
      ? ({
          _id: (dto as HoraireInfirmierDto)?.id,
          name: dto.name,
          color: dto.color,
          enabled: dto.enabled,
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
          enabled: entity.enabled,
        } as HoraireInfirmierDto)
      : undefined;
  }

  public entitiesToDtos(entities: HoraireInfirmier[]): HoraireInfirmierDto[] {
    return Array.isArray(entities) && entities.length !== 0 ? entities.filter(Boolean).map(this.entityToDto) : [];
  }
}
