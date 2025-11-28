import { ApiProperty } from '@nestjs/swagger';
import { LoanStatus } from 'generated/prisma/enums';

export class LoanResponseDto {
  @ApiProperty({
    description: 'ID único do empréstimo',
    example: 'clxka1z0q0000abcde1234567',
  })
  id: string;

  @ApiProperty({
    description: 'Matrícula do usuário que realizou o empréstimo',
    example: '20230001',
  })
  userMatricula: string;

  @ApiProperty({
    description: 'ID do exemplar (BookCopy) emprestado',
    example: 'clxka1z0q0000abcde7654321',
  })
  bookCopyId: string;

  @ApiProperty({
    description: 'Data em que o empréstimo foi realizado',
    example: '2025-11-26T10:00:00.000Z',
  })
  dataEmprestimo: Date;

  @ApiProperty({
    description: 'Data limite para devolução',
    example: '2025-12-10T23:59:59.000Z',
  })
  dataLimite: Date;

  @ApiProperty({
    description: 'Data de devolução (null se ainda não foi devolvido)',
    example: null,
    nullable: true,
  })
  dataDevolucao: Date | null;

  @ApiProperty({
    description: 'Status do empréstimo',
    enum: LoanStatus,
    example: LoanStatus.ATIVO,
  })
  status: LoanStatus;

  @ApiProperty({
    description: 'Número de renovações realizadas',
    example: 0,
  })
  renovacoes: number;

  @ApiProperty({
    description: 'Valor da dívida acumulada',
    example: 0.0,
  })
  divida: number;
}



