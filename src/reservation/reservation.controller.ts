import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { AuthGuard } from '../auth/guards/auth.guard'; 
import { User, UserPayload } from '../auth/decorators/user.decorator';


@ApiTags('Reservas')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post(':bookId')
  @ApiOperation({ summary: 'Reservar um livro indisponível' })
  @ApiResponse({ status: 201, description: 'Reserva criada.' })
  @ApiResponse({ status: 400, description: 'Livro está disponível (deve alugar).' })
  createReservation(
    @Param('bookId') bookId: string,
    @Body() dto: CreateReservationDto,
    @User() user,
  ) {
    return this.reservationService.createReservation(user.matricula, bookId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar minhas reservas ativas' })
  getMyReservations(@User() user) {
    return this.reservationService.getMyReservations(user.matricula);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Cancelar uma reserva' })
  cancelReservation(@Param('id') id: string, @User() user) {
    return this.reservationService.cancelReservation(user.matricula, id);
  }
}