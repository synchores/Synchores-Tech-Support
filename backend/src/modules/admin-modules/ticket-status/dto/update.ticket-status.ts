import { Field, InputType, Int, registerEnumType } from '@nestjs/graphql';
import { IsBoolean, IsEnum, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export enum TicketStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  ON_HOLD = 'on_hold',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

registerEnumType(TicketStatus, {
  name: 'TicketStatus',
});

@InputType()
export class UpdateTicketStatusDto {
  @Field(() => Int)
  @IsInt()
  declare ticketId: number;

  @Field(() => TicketStatus)
  @IsEnum(TicketStatus)
  declare status: TicketStatus;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  adminRemarks?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  notifyClient?: boolean;
}
