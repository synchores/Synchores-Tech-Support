import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ServicesTbl } from "src/modules/admin-modules/services/entity/service.tbl";
import { UsersTbl } from "src/modules/general/auth/entity/users.tbl";
import { TicketsTbl } from "src/modules/client-modules/tickets/entity/tickets.tbl";

export const DatabaseConfig =  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST'),
        port: Number(config.get<string>('DB_PORT')),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        entities: [TicketsTbl, UsersTbl, ServicesTbl],
        synchronize: config.get<string>('DB_SYNC') === 'true',
    })
})