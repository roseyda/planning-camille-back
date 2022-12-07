import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HoraireInfirmierSchema } from './entities/horaire-infirmier.entity';
import { HoraireInfirmierMapperService } from './horaire-infirmier-mapper.service';
import { HoraireInfirmierController } from './horaire-infirmier.controller';
import { HoraireInfirmierService } from './horaire-infirmier.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'HoraireInfirmier', schema: HoraireInfirmierSchema }])],
  controllers: [HoraireInfirmierController],
  providers: [HoraireInfirmierService, HoraireInfirmierMapperService],
})
export class HoraireInfirmierModule {}
