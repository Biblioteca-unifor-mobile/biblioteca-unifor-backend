import { Controller, Post, Delete, Get, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { User, UserPayload } from 'src/auth/decorators/user.decorator';
import { CheckoutDto } from './dto/checkout.dto';
import { ReserveBookDto } from './dto/reserve-book.dto';

@ApiTags('Cesta (Cart)')
@ApiBearerAuth()
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add/:bookId')
  @ApiOperation({ summary: 'Adicionar livro à cesta' })
  @ApiResponse({ status: 201, description: 'Livro adicionado à cesta' })
  addToCart(@Param('bookId') bookId: string, @User() user: UserPayload) {
    return this.cartService.addToCart(user.matricula, bookId);
  }

  @Get()
  @ApiOperation({ summary: 'Listar itens da cesta do usuário' })
  getCart(@User() user: UserPayload) {
    return this.cartService.getCart(user.matricula);
  }

  @Delete(':bookId')
  @ApiOperation({ summary: 'Remover um livro da cesta (por bookId)' })
  removeFromCart(@Param('bookId') bookId: string, @User() user: UserPayload) {
    return this.cartService.removeFromCart(user.matricula, bookId);
  }

  @Delete()
  @ApiOperation({ summary: 'Limpar a cesta do usuário' })
  clearCart(@User() user: UserPayload) {
    return this.cartService.clearCart(user.matricula);
  }

  @Post('checkout')
  @ApiOperation({ summary: 'Converter cesta em empréstimo(s)' })
  @ApiResponse({ status: 201, description: 'Empréstimo(s) criado(s) com sucesso' })
  @ApiResponse({ status: 400, description: 'Cesta vazia ou erro na validação' })
  checkout(@User() user: UserPayload, @Body() checkoutDto: CheckoutDto) {
    return this.cartService.checkout(user.matricula, checkoutDto.dataLimite);
  }
}