import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) { }


    @Roles("ADMINISTRADOR", "SUPER")
    @Get()
    async getAll(@Query("skip") skip?: string, @Query("take") take?: string) {
        const users = await this.userService.users({
            skip: skip ? Number(skip) : undefined,
            take: take ? Number(take) : undefined,
        });

        return {
            message: 'Usuários listados com sucesso.',
            count: users.length,
            data: users,
        };
    }

    @Roles("ADMINISTRADOR", "SUPER")
    @Post()
    async createUser(@Body() user: CreateUserDto) {
        const newUser = await this.userService.createUser({
            ...user
        });
        return {
            message: 'Usuário criado com sucesso.',
            data: newUser,
        };
    }

    @Roles("ADMINISTRADOR", "SUPER")
    @Patch(":matricula")
    async updateUser(@Param("matricula") matricula: string, @Body() user: UpdateUserDto) {
        const updatedUser = await this.userService.updateUser({
            where: { matricula },
            data: {
                ...user
            },
        });
        return {
            message: 'Usuário atualizado com sucesso.',
            data: updatedUser,
        };
    }

    @Roles("ADMINISTRADOR", "SUPER")
    @Delete(":matricula")
    async deleteUser(@Param("matricula") matricula: string) {
        await this.userService.deleteUser({ matricula });
        return { message: 'Usuário removido com sucesso.' };
    }

    @Roles("ADMINISTRADOR", "SUPER")
    @Get(":matricula")
    async getUser(@Param("matricula") matricula: string) {
        const user = await this.userService.findOne({ matricula });
        return {
            message: 'Usuário encontrado com sucesso.',
            data: user,
        };
    }

    @Roles("ADMINISTRADOR", "SUPER")
    @Get(":matricula/folders")
    @ApiOperation({ 
        summary: 'Listar todas as pastas de um usuário (Admin/Super)', 
        description: 'Retorna todas as pastas que pertencem ao usuário especificado. Apenas ADMIN e SUPER_USER podem acessar.' 
    })
    @ApiParam({ name: 'matricula', description: 'Matrícula do usuário', example: '20230001' })
    @ApiResponse({ status: 200, description: 'Pastas listadas com sucesso.' })
    @ApiResponse({ status: 401, description: 'Usuário não autenticado.' })
    @ApiResponse({ status: 403, description: 'Usuário não possui permissão.' })
    @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
    async getUserFolders(@Param("matricula") matricula: string) {
        const folders = await this.userService.getUserFolders(matricula);
        return {
            message: 'Pastas do usuário listadas com sucesso.',
            count: folders.length,
            data: folders,
        };
    }

    @Roles("ADMINISTRADOR", "SUPER")
    @Get(":matricula/loans")
    @ApiOperation({ 
        summary: 'Listar todos os empréstimos de um usuário (Admin/Super)', 
        description: 'Retorna todos os empréstimos realizados pelo usuário especificado. Apenas ADMIN e SUPER_USER podem acessar.' 
    })
    @ApiParam({ name: 'matricula', description: 'Matrícula do usuário', example: '20230001' })
    @ApiResponse({ status: 200, description: 'Empréstimos listados com sucesso.' })
    @ApiResponse({ status: 401, description: 'Usuário não autenticado.' })
    @ApiResponse({ status: 403, description: 'Usuário não possui permissão.' })
    @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
    async getUserLoans(@Param("matricula") matricula: string) {
        const loans = await this.userService.getUserLoans(matricula);
        return {
            message: 'Empréstimos do usuário listados com sucesso.',
            count: loans.length,
            data: loans,
        };
    }

    @Roles("ADMINISTRADOR", "SUPER")
    @Get(":matricula/reservations")
    @ApiOperation({ 
        summary: 'Listar todas as reservas de um usuário (Admin/Super)', 
        description: 'Retorna todas as reservas realizadas pelo usuário especificado. Apenas ADMIN e SUPER_USER podem acessar.' 
    })
    @ApiParam({ name: 'matricula', description: 'Matrícula do usuário', example: '20230001' })
    @ApiResponse({ status: 200, description: 'Reservas listadas com sucesso.' })
    @ApiResponse({ status: 401, description: 'Usuário não autenticado.' })
    @ApiResponse({ status: 403, description: 'Usuário não possui permissão.' })
    @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
    async getUserReservations(@Param("matricula") matricula: string) {
        const reservations = await this.userService.getUserReservations(matricula);
        return {
            message: 'Reservas do usuário listadas com sucesso.',
            count: reservations.length,
            data: reservations,
        };
    }



}
