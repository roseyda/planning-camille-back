import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateHoraireInfirmierDto } from './create-horaire-infirmier.dto';

export class HoraireInfirmierDto extends CreateHoraireInfirmierDto {
  @ApiProperty()
  @IsNotEmpty()
  id: string;
}
