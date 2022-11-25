import { NestApplicationOptions } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const applicationOptions: NestApplicationOptions = {
    cors: {
      origin: true,
      methods: ['GET', 'PUT', 'POST', 'DELETE', 'HEAD', 'OPTIONS'],
      credentials: true,
    } as CorsOptions,
  };

  const app = await NestFactory.create(AppModule, applicationOptions);

  if ('false' === process.env.PRODUCTION) {
    const config = new DocumentBuilder()
      .setTitle(process.env.npm_package_name)
      .setVersion(process.env.npm_package_version)
      // .addBearerAuth(
      //   {
      //     type: 'http',
      //     scheme: 'bearer',
      //     bearerFormat: 'JWT',
      //     name: 'JWT',
      //     description: 'Enter JWT token',
      //     in: 'header',
      //   },
      //   'JWT-auth' // This name here is important for matching up with @ApiBearerAuth() in your controller!
      // )
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(process.env.PORT || 8080);
}
bootstrap();
