import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Habilitar CORS globalmente
  app.enableCors({
    origin: 'http://localhost:4200', // Substitua pelo domínio do seu cliente Angular
    methods: 'GET,POST,PUT,DELETE', // Métodos permitidos
    allowedHeaders: 'Content-Type, Authorization', // Cabeçalhos permitidos
    credentials: true, // Se você precisa enviar cookies e cabeçalhos de autenticação
  });

  app.use(cookieParser())
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
