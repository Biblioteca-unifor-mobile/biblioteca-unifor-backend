import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreateReservationDto {
  @ApiProperty({
    description: 'Data limite de interesse na reserva (ex: quero esperar até mês que vem)',
    example: '2025-12-31T23:59:59Z',
  })
  @IsNotEmpty()
  @IsDateString()
  dataLimite: string;
}