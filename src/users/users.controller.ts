import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Roles } from 'src/enum/roles.decorator';
import { RolesGuard } from 'src/enum/roles.guard';
import { Role } from 'src/enum/roles.enum';

@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('admin')
  @Roles(Role.Admin)
  findAllAdmins() {
    // lógica para obtener todos los administradores
  }

  @Get('user')
  @Roles(Role.User)
  findAllUsers() {
    // lógica para obtener todos los usuarios
  }
}