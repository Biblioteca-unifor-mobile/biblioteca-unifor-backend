import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ReservationService {
  constructor(private prisma: PrismaService) {}

  async createReservation(
    userMatricula: string,
    bookId: string,
    dto: CreateReservationDto,
  ) {
    // 1. Validar se o livro existe
    const book = await this.prisma.book.findUnique({
      where: { id: bookId },
    });

    if (!book) {
      throw new NotFoundException('Livro não encontrado.');
    }

    const dataLimite = new Date(dto.dataLimite);
    if (dataLimite <= new Date()) {
      throw new BadRequestException('A data limite deve ser no futuro.');
    }

    // 2. Verificar se o usuário já tem esse livro ALUGADO (Empréstimo Ativo)
    const activeLoan = await this.prisma.loan.findFirst({
      where: {
        userMatricula,
        bookCopy: { bookId },
        status: 'ATIVO',
      },
    });

    if (activeLoan) {
      throw new ConflictException('Você já possui um exemplar deste livro emprestado.');
    }

    // 3. Verificar se o usuário já tem RESERVA ativa
    const existingReservation = await this.prisma.reservation.findFirst({
      where: {
        userMatricula,
        bookCopy: { bookId },
        status: 'ATIVA',
      },
    });

    if (existingReservation) {
      throw new ConflictException('Você já tem uma reserva ativa para este livro.');
    }

    // 4. Verificar disponibilidade (Só pode reservar se NÃO tiver disponível)
    const availableCopy = await this.prisma.bookCopy.findFirst({
      where: {
        bookId,
        status: 'DISPONIVEL',
      },
    });

    if (availableCopy) {
      throw new BadRequestException(
        'Há exemplares disponíveis! Adicione à cesta e realize o empréstimo em vez de reservar.',
      );
    }

    // 5. Buscar um exemplar que esteja ALUGADO para atrelar a reserva
    // Pegamos o primeiro que encontrarmos que esteja alugado.
    const copyToReserve = await this.prisma.bookCopy.findFirst({
      where: {
        bookId,
        status: 'ALUGADO',
      },
    });

    if (!copyToReserve) {
      throw new BadRequestException(
        'Não foi possível realizar a reserva (não há exemplares em circulação).',
      );
    }

    // 6. Criar a Reserva
    return this.prisma.reservation.create({
      data: {
        userMatricula,
        bookCopyId: copyToReserve.id,
        dataLimite,
        status: 'ATIVA',
      },
      include: {
        bookCopy: { include: { book: true } },
      },
    });
  }

  async getMyReservations(userMatricula: string) {
    return this.prisma.reservation.findMany({
      where: { userMatricula, status: 'ATIVA' },
      include: {
        bookCopy: {
          include: { book: true },
        },
      },
      orderBy: { dataReserva: 'asc' },
    });
  }

  async cancelReservation(userMatricula: string, reservationId: string) {
    const reservation = await this.prisma.reservation.findUnique({
      where: { id: reservationId },
    });

    if (!reservation) {
      throw new NotFoundException('Reserva não encontrada.');
    }

    if (reservation.userMatricula !== userMatricula) {
      throw new ConflictException('Esta reserva não pertence a você.');
    }

    // Removemos do banco (ou você pode mudar status para CANCELADA se preferir histórico)
    return this.prisma.reservation.delete({
      where: { id: reservationId },
    });
  }
}