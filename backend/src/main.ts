import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { GqlThrottlerExceptionFilter } from './common/filters/gql-throttler-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.set('trust proxy', 1);
  app.useGlobalFilters(new GqlThrottlerExceptionFilter());

  // ✅ Dynamic CORS from ENV
  const allowedOrigins = process.env.FRONTEND_ORIGINS?.split(',') || [];

  app.enableCors({
    origin: (origin, callback) => {
      const allowed = process.env.FRONTEND_ORIGINS?.split(',') || [];

      if (!origin || allowed.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  });

  // Serve static uploads
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads',
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
}

bootstrap();