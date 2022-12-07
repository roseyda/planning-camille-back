import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { HoraireInfirmierModule } from './horaire-infirmier/horaire-infirmier.module';
import { PlanningModule } from './planning/planning.module';
import { LoginModule } from './login/login.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    PlanningModule,
    HoraireInfirmierModule,
    RouterModule.register([
      {
        path: '/api/v1',
        module: PlanningModule,
      },
      {
        path: '/api/v1',
        module: HoraireInfirmierModule,
      },
    ]),
    AuthModule,
    LoginModule,
  ],
})
export class AppModule {}
