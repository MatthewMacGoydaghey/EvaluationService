import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService)
  const PORT = config.get('API_PORT') || 3000
  const swaggerConfig = new DocumentBuilder()
  .setTitle('Evaluation service')
  .build()
  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('/api', app, document)
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
}
bootstrap();
