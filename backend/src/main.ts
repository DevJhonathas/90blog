import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const port = Number(process.env.PORT);

  if (!port) {
    throw new Error('Porta não definida');
  }

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
  });

  await app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
}

await bootstrap();
