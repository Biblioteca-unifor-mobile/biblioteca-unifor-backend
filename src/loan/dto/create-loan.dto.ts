import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLoanDto {
  @ApiProperty({
    description: 'O ID da cópia do livro a ser emprestada.',
    example: 'clxpfv6b0000008l2f6zge2d8',
  })
  @IsString()
  @IsNotEmpty()
  bookCopyId: string;
}
