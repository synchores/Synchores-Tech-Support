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
      // allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  });

  // Static uploads
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads',
  });

  // Safe port handling (IMPORTANT for Docker)
  const port = Number(process.env.PORT) || 3501;

  await app.listen(port, '0.0.0.0');
}

bootstrap();