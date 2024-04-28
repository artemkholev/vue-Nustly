import { UsersService } from './users.service';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from './users.model';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/modules/auth/roles-auth.decorator';
import { RolesGuard } from 'src/modules/auth/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { GetCurrentUserId } from 'src/common/decorators/get-current-user-id';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Выдать роль' })
  @ApiResponse({ status: 200 })
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/role')
  getUsers(@Body() dto: AddRoleDto) {
    return this.usersService.addRole(dto);
  }

  @ApiOperation({ summary: 'Получение пользователя' })
  @ApiResponse({ status: 200, type: User })
  @Get()
  getUser(@GetCurrentUserId() userId: string) {
    return this.usersService.getUser(userId);
  }
}
