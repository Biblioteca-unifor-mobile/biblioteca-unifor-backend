import { ApiProperty } from '@nestjs/swagger';
import { ReservationStatus } from 'generated/prisma/enums';

export class ReservationResponseDto {
  @ApiProperty({
    description: 'ID único da reserva',
    example: 'clxka1z0q0000abcde1234567',
  })
  id: string;

  @ApiProperty({
    description: 'Matrícula do usuário que realizou a reserva',
    example: '20230001',
  })
  userMatricula: string;

  @ApiProperty({
    description: 'ID do exemplar (BookCopy) reservado',
    example: 'clxka1z0q0000abcde7654321',
  })
  bookCopyId: string;

  @ApiProperty({
    description: 'Data em que a reserva foi realizada',
    example: '2025-11-26T10:00:00.000Z',
  })
  dataReserva: Date;

  @ApiProperty({
    description: 'Data limite da reserva',
    example: '2025-11-28T23:59:59.000Z',
  })
  dataLimite: Date;

  @ApiProperty({
    description: 'Status da reserva',
    enum: ReservationStatus,
    example: ReservationStatus.ATIVA,
  })
  status: ReservationStatus;
}



