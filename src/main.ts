require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { NestApplicationOptions } from '@nestjs/common';


async function bootstrap() {
  const opts: NestApplicationOptions = {};
  const app = await NestFactory.create(AppModule,opts);
  app.use(cookieParser());
  app.enableCors({
    credentials: true,
    origin: '*',
    allowedHeaders: 'Content-Type, Access-Control-Allow-Headers, Authorization',
  });
  await app.listen(3000);
}
bootstrap();
