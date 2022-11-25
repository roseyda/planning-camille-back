import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { HoraireInfirmierModule } from './horaire-infirmier/horaire-infirmier.module';
import { PlanningModule } from './planning/planning.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    PlanningModule,
    HoraireInfirmierModule,
    RouterModule.register([
      {
        path: '/api/v1/planning',
        module: PlanningModule,
      },
      {
        path: '/api/v1/horaire-infirmier',
        module: HoraireInfirmierModule,
      },
    ]),
  ],
})
export class AppModule {}
