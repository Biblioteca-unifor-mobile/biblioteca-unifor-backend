import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateLoanDto } from './dto/create-loan.dto';

@Injectable()
export class LoanService {
  constructor(private prisma: PrismaService) {}

  async createLoan(userMatricula: string, createLoanDto: CreateLoanDto) {
    const { bookCopyId } = createLoanDto;

    const bookCopy = await this.prisma.bookCopy.findUnique({
      where: { id: bookCopyId },
    });

    if (!bookCopy) {
      throw new NotFoundException('Exemplar do livro não encontrado.');
    }

    if (bookCopy.status !== 'DISPONIVEL') {
      throw new ConflictException(
        'Este exemplar não está disponível para empréstimo.',
      );
    }

    const dataLimite = new Date();
    dataLimite.setDate(dataLimite.getDate() + 7);

    return this.prisma.$transaction(async (prisma) => {
      const loan = await prisma.loan.create({
        data: {
          userMatricula,
          bookCopyId,
          dataLimite,
        },
      });

      await prisma.bookCopy.update({
        where: { id: bookCopyId },
        data: { status: 'ALUGADO' },
      });

      return loan;
    });
  }

  async returnLoan(loanId: string) {
    const loan = await this.prisma.loan.findUnique({
      where: { id: loanId },
    });

    if (!loan) {
      throw new NotFoundException('Empréstimo não encontrado.');
    }

    if (loan.status === 'DEVOLVIDO') {
      throw new ConflictException('Este empréstimo já foi devolvido.');
    }

    const dataDevolucao = new Date();
    let divida = 0;
    if (dataDevolucao > loan.dataLimite) {
      const diasAtraso = Math.ceil(
        (dataDevolucao.getTime() - loan.dataLimite.getTime()) /
          (1000 * 3600 * 24),
      );
      divida = diasAtraso * 1.0;
    }

    return this.prisma.$transaction(async (prisma) => {
      const updatedLoan = await prisma.loan.update({
        where: { id: loanId },
        data: {
          status: 'DEVOLVIDO',
          dataDevolucao,
          divida,
        },
      });

      await prisma.bookCopy.update({
        where: { id: loan.bookCopyId },
        data: { status: 'DISPONIVEL' },
      });

      return updatedLoan;
    });
  }

  async renewLoan(loanId: string) {
    const loan = await this.prisma.loan.findUnique({
      where: { id: loanId },
    });

    if (!loan) {
      throw new NotFoundException('Empréstimo não encontrado.');
    }
    if (loan.status !== 'ATIVO') {
      throw new ConflictException('Este empréstimo não está ativo.');
    }
    if (loan.renovacoes >= 3) {
      throw new ConflictException(
        'Limite de renovações atingido para este empréstimo.',
      );
    }

    const novaDataLimite = new Date(loan.dataLimite);
    novaDataLimite.setDate(novaDataLimite.getDate() + 7);

    return this.prisma.loan.update({
      where: { id: loanId },
      data: {
        dataLimite: novaDataLimite,
        renovacoes: {
          increment: 1,
        },
      },
    });
  }

  async getLoanHistory(userMatricula: string) {
    return this.prisma.loan.findMany({
      where: { userMatricula },
      orderBy: { dataEmprestimo: 'desc' },
      include: {
        bookCopy: {
          include: {
            book: true,
          },
        },
      },
    });
  }

  async getActiveLoans(userMatricula: string) {
    return this.prisma.loan.findMany({
      where: { userMatricula, status: 'ATIVO' },
      orderBy: { dataLimite: 'asc' },
      include: {
        bookCopy: {
          include: {
            book: true,
          },
        },
      },
    });
  }

  async getLoanById(loanId: string) {
    const loan = await this.prisma.loan.findUnique({
      where: { id: loanId },
      include: {
        bookCopy: {
          include: {
            book: true,
          },
        },
        user: true,
      },
    });
    if (!loan) {
      throw new NotFoundException('Empréstimo não encontrado.');
    }
    return loan;
  }
}
