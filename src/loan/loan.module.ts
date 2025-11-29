import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { LoanController } from './loan.controller';
import { LoanService } from './loan.service';

@Module({
  providers: [LoanService, PrismaService],
  controllers: [LoanController],
})
export class LoanModule {}
