import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { User as UserDecorator } from '../auth/decorators/user.decorator';
import { CreateLoanDto } from './dto/create-loan.dto';
import { LoanService } from './loan.service';

@ApiBearerAuth()
@ApiTags('Empréstimos')
@UseGuards(AuthGuard)
@Controller('loan')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Post()
  @ApiOperation({
    summary: 'Cria um novo empréstimo',
    description:
      'Cria um novo empréstimo de um exemplar de livro para o usuário logado.',
  })
  @ApiResponse({
    status: 201,
    description: 'O empréstimo foi criado com sucesso.',
  })
  @ApiResponse({ status: 404, description: 'Exemplar não encontrado.' })
  @ApiResponse({
    status: 409,
    description: 'Exemplar não está disponível para empréstimo.',
  })
  createLoan(
    @UserDecorator() user,
    @Body() createLoanDto: CreateLoanDto,
  ) {
    return this.loanService.createLoan(user.matricula, createLoanDto);
  }

  @Patch(':id/return')
  @ApiOperation({
    summary: 'Devolve um empréstimo',
    description: 'Registra a devolução de um exemplar de livro.',
  })
  @ApiResponse({
    status: 200,
    description: 'O empréstimo foi devolvido com sucesso.',
  })
  @ApiResponse({ status: 404, description: 'Empréstimo não encontrado.' })
  @ApiResponse({
    status: 409,
    description: 'Este empréstimo já foi devolvido.',
  })
  returnLoan(@Param('id') id: string) {
    return this.loanService.returnLoan(id);
  }

  @Patch(':id/renew')
  @ApiOperation({
    summary: 'Renova um empréstimo',
    description: 'Renova a data de devolução de um empréstimo ativo.',
  })
  @ApiResponse({
    status: 200,
    description: 'O empréstimo foi renovado com sucesso.',
  })
  @ApiResponse({ status: 404, description: 'Empréstimo não encontrado.' })
  @ApiResponse({
    status: 409,
    description:
      'Empréstimo não está ativo ou já atingiu o limite de renovações.',
  })
  renewLoan(@Param('id') id: string) {
    return this.loanService.renewLoan(id);
  }

  @Get('history')
  @ApiOperation({
    summary: 'Histórico de empréstimos',
    description: 'Retorna o histórico de empréstimos do usuário logado.',
  })
  @ApiResponse({
    status: 200,
    description: 'Histórico de empréstimos retornado com sucesso.',
  })
  getLoanHistory(@UserDecorator() user) {
    return this.loanService.getLoanHistory(user.matricula);
  }

  @Get('active')
  @ApiOperation({
    summary: 'Empréstimos ativos',
    description: 'Retorna os empréstimos ativos do usuário logado.',
  })
  @ApiResponse({
    status: 200,
    description: 'Empréstimos ativos retornados com sucesso.',
  })
  getActiveLoans(@UserDecorator() user) {
    return this.loanService.getActiveLoans(user.matricula);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Detalhes de um empréstimo',
    description: 'Retorna os detalhes de um empréstimo específico.',
  })
  @ApiResponse({
    status: 200,
    description: 'Detalhes do empréstimo retornados com sucesso.',
  })
  @ApiResponse({ status: 404, description: 'Empréstimo não encontrado.' })
  getLoanById(@Param('id') id: string) {
    return this.loanService.getLoanById(id);
  }
}
