import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { HoraireInfirmierModule } from './horaire-infirmier/horaire-infirmier.module';
import { LoginModule } from './login/login.module';
import { PlanningModule } from './planning/planning.module';
import { PublicModule } from './public/public.module';

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
      {
        path: '/api/v1',
        module: LoginModule,
      },
      {
        path: '/api/v1',
        module: PublicModule,
      },
    ]),
    AuthModule,
    LoginModule,
    PublicModule,
  ],
})
export class AppModule {}
