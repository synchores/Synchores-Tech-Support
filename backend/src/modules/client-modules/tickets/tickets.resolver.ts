import { Resolver } from '@nestjs/graphql';
import { TicketsService } from './tickets.service';
import { TicketsTbl } from './entity/tickets.tbl';
import { Mutation, Args, Context } from '@nestjs/graphql';
import { CreateTicketDto } from './dto/create.ticket';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Resolver()
export class TicketsResolver {
    constructor(
        private readonly ticketsService: TicketsService,
        private readonly jwtService: JwtService,
    ){}

    @Mutation(() => TicketsTbl)
    async createTicket(@Args('input') input: CreateTicketDto, @Context() context: any){
        const authHeader = context?.req?.headers?.authorization;

        if(!authHeader || !authHeader.startsWith('Bearer ')){
            throw new UnauthorizedException('Missing or invalid authorization token');
        }

        const token = authHeader.replace('Bearer ', '');
        const payload = this.jwtService.verify<{ userId?: number; sub?: number }>(token, {
            secret: process.env.JWT_SECRET,
        });

        const userId = payload.userId ?? payload.sub;

        if(!userId){
            throw new UnauthorizedException('Invalid token payload');
        }

        const ticket = await this.ticketsService.createTicket(userId, input);
        return ticket;
    }
}
