import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfig } from './config/db.config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthModule } from './modules/general/auth/auth.module';
import { TicketsModule } from './modules/client-modules/tickets/tickets.module';
import { ServicesModule } from './modules/admin-modules/services/services.module';
import { NotificationsModule } from './modules/general/notifications/notifications.module';
import { UsersCrudModule } from './modules/admin-modules/users-crud/users-crud.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseConfig,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: process.env.AUTO_SCHEMA === 'true',
      playground: process.env.PLAYGROUND === 'true',
    }),
    AuthModule,
    TicketsModule,
    ServicesModule,
    UsersCrudModule,
    NotificationsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
