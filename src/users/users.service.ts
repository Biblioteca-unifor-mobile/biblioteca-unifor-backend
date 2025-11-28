import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
  InternalServerErrorException,
  HttpException,
} from '@nestjs/common';
import { Prisma, User } from 'generated/prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User> {
    try {
      const user = await this.prisma.user.findUnique({
        where: userWhereUniqueInput,
      });

      if (!user) throw new NotFoundException('Usuário não encontrado.');
      return user;
    } catch (error) {
      // Se for uma exceção HTTP do Nest, relança diretamente
      if (error instanceof HttpException) throw error;
      throw this.handlePrismaError(error, 'buscar o usuário');
    }
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;

    try {
      return await this.prisma.user.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
      });
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw this.handlePrismaError(error, 'listar usuários');
    }
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    try {
      return await this.prisma.user.create({ data });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Email ou matrícula já estão em uso.');
      }
      if (error instanceof HttpException) throw error;
      throw this.handlePrismaError(error, 'criar o usuário');
    }
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;

    try {
      const userExists = await this.prisma.user.findUnique({ where });
      if (!userExists) throw new NotFoundException('Usuário não encontrado.');

      return await this.prisma.user.update({
        data,
        where,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Email ou matrícula já estão em uso.');
      }
      if (error instanceof HttpException) throw error;
      throw this.handlePrismaError(error, 'atualizar o usuário');
    }
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    try {
      const user = await this.prisma.user.findUnique({ where });
      if (!user) throw new NotFoundException('Usuário não encontrado.');

      return await this.prisma.user.delete({ where });
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw this.handlePrismaError(error, 'deletar o usuário');
    }
  }

  /**
   * Busca todas as pastas (folders) de um usuário específico
   */
  async getUserFolders(matricula: string) {
    try {
      // Verifica se o usuário existe
      const user = await this.findOne({ matricula });

      if (!user) {
        throw new NotFoundException('Usuário não encontrado.');
      }

      // Busca as pastas através da relação FolderUser
      const folderMemberships = await this.prisma.folderUser.findMany({
        where: { userMatricula: matricula },
        include: {
          folder: {
            include: {
              users: true,
              books: true,
            },
          },
        },
      });

      // Retorna apenas os folders
      return folderMemberships.map((membership) => membership.folder);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw this.handlePrismaError(error, 'buscar pastas do usuário');
    }
  }

  /**
   * Busca todos os empréstimos (loans) de um usuário específico
   */
  async getUserLoans(matricula: string) {
    try {
      // Verifica se o usuário existe
      const user = await this.findOne({ matricula });

      if (!user) {
        throw new NotFoundException('Usuário não encontrado.');
      }

      // Busca os empréstimos do usuário
      return await this.prisma.loan.findMany({
        where: { userMatricula: matricula },
        include: {
          bookCopy: {
            include: {
              book: true,
            },
          },
        },
        orderBy: {
          dataEmprestimo: 'desc',
        },
      });
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw this.handlePrismaError(error, 'buscar empréstimos do usuário');
    }
  }

  /**
   * Busca todas as reservas (reservations) de um usuário específico
   */
  async getUserReservations(matricula: string) {
    try {
      // Verifica se o usuário existe
      const user = await this.findOne({ matricula });

      if (!user) {
        throw new NotFoundException('Usuário não encontrado.');
      }

      // Busca as reservas do usuário
      return await this.prisma.reservation.findMany({
        where: { userMatricula: matricula },
        include: {
          bookCopy: {
            include: {
              book: true,
            },
          },
        },
        orderBy: {
          dataReserva: 'desc',
        },
      });
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw this.handlePrismaError(error, 'buscar reservas do usuário');
    }
  }

  /**
   * Método genérico para tratar erros do Prisma
   */
  private handlePrismaError(error: any, action: string) {
    if (error.code === 'P2002') {
      throw new ConflictException(`Violação de unicidade ao ${action}.`);
    }

    if (error.code === 'P2025') {
      throw new NotFoundException(`Registro não encontrado ao ${action}.`);
    }

    console.error(`Erro inesperado ao ${action}:`, error);
    throw new InternalServerErrorException(
      `Erro interno ao ${action}. Tente novamente mais tarde.`,
    );
  }
}
