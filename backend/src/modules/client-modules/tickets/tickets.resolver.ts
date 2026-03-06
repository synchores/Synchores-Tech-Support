import { Resolver } from '@nestjs/graphql';
import { TicketsService } from './tickets.service';
import { TicketsTbl } from './entity/tickets.tbl';
import { Mutation, Args, Context, Query } from '@nestjs/graphql';
import { CreateTicketDto } from './dto/create.ticket';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Resolver(() => TicketsTbl)
export class TicketsResolver {
    constructor(
        private readonly ticketsService: TicketsService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ){}

    @Query(() => [TicketsTbl], { name: 'getMyTickets' })
    async getMyTickets(@Context() context: any){
        const authHeader = context?.req?.headers?.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer ')){
            throw new UnauthorizedException('Missing or invalid authorization token');
        }

        const token = authHeader.replace('Bearer ', '');
        const jwtSecret = this.configService.get<string>('JWT_SECRET');
        const payload = this.jwtService.verify<{ userId?: number; sub?: number }>(token, {
            secret: jwtSecret,
        });

        const userId = Number(payload.userId ?? payload.sub);
        if(!userId){
            throw new UnauthorizedException('Invalid token payload');
        }

        return await this.ticketsService.readTicketsForUser(userId);
    }

    @Mutation(() => TicketsTbl)
    async createTicket(@Args('input') input: CreateTicketDto, @Context() context: any){
        const authHeader = context?.req?.headers?.authorization;

        if(!authHeader || !authHeader.startsWith('Bearer ')){
            throw new UnauthorizedException('Missing or invalid authorization token');
        }

        const token = authHeader.replace('Bearer ', '');
        const jwtSecret = this.configService.get<string>('JWT_SECRET');
        const payload = this.jwtService.verify<{ userId?: number; sub?: number }>(token, {
            secret: jwtSecret,
        });

        const userId = Number(payload.userId ?? payload.sub);

        if(!userId){
            throw new UnauthorizedException('Invalid token payload');
        }

        const ticket = await this.ticketsService.createTicket(userId, input);
        return ticket;
    }
}
