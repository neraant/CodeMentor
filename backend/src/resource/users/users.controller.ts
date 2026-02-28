import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '@/common/decorators/roles.decorator';
import { UserRole } from '@/common/types/user.type';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(UserRole.MENTOR)
  @Get()
  findAll(): Promise<User[] | null> {
    return this.usersService.findAll();
  }

  @Roles(UserRole.MENTOR)
  @Get(':id')
  findById(@Param('id', ParseUUIDPipe) id: string): Promise<User | null> {
    console.error(id);
    return this.usersService.findById(id);
  }
}
