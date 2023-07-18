import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule , {cors : true});
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  
  const config = new DocumentBuilder()
    .setTitle('weather api')
    .setDescription('basic weather api for lamsa test')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  await app.listen(port || 4000);
}
bootstrap();
