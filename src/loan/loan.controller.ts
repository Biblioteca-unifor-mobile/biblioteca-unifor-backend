import { 
  Controller, Get, Patch, Param, UseGuards, ForbiddenException 
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { User, User as UserDecorator, UserPayload } from '../auth/decorators/user.decorator';
import { LoanService } from './loan.service';
import { Roles } from 'src/auth/decorators/roles.decorator';

@ApiBearerAuth()
@ApiTags('Empréstimos')
@UseGuards(AuthGuard)
@Controller('loan')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}


  @Get() // GET /loans -> Lista meus empréstimos
  @ApiOperation({ summary: 'Listar meus empréstimos (Histórico e Ativos)' })
  getMyLoans(@User() user) {
    // Você pode usar o método getLoanHistory ou getActiveLoans que você já tem
    return this.loanService.getLoanHistory(user.matricula);
  }

  @Get('admin/copy/:copyId') // Rota diferente para evitar conflito
  @Roles('ADMINISTRADOR')
  @ApiOperation({ summary: '[ADMIN] Consultar status detalhado de um exemplar' })
  async getBookCopyStatus(
    @Param('copyId') copyId: string, 
    @User() user: UserPayload
  ) {

    return this.loanService.getBookCopyStatus(copyId);
  }

  
  @Patch(':id/return') // PATCH /loans/:id/return
  @ApiOperation({ summary: 'Devolver um livro e calcular multa se houver' })
  returnLoan(@Param('id') loanId: string) {
    // Mantém a sua lógica original que calcula a dívida!
    return this.loanService.returnLoan(loanId);
  }


  @Patch(':id/renew') // PATCH /loans/:id/renew
  @ApiOperation({ summary: 'Renovar empréstimo (Máx 3 vezes)' })
  renewLoan(@Param('id') loanId: string) {
    // Essa lógica é exclusiva de empréstimo, o Cart não sabe fazer isso
    return this.loanService.renewLoan(loanId);
  }

  
  @Get(':id')
  @ApiOperation({ summary: 'Ver detalhes de um empréstimo específico' })
  getLoanById(@Param('id') id: string) {
    return this.loanService.getLoanById(id);
  }
}
