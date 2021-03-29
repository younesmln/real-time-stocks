import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
// import { WsAdapter } from '@nestjs/platform-ws';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });

  app.enableCors({
    origin: '*', // TODO: fix cors allow all
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
    credentials: true,
  });

  app.useWebSocketAdapter(new IoAdapter(app));

  const configService = app.get(ConfigService);
  const PORT = configService.get('SERVER_PORT');
  await app.listen(PORT);
}
bootstrap();
