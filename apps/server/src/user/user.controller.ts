import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { IdOrUsernameParam } from './dtos/getUser.dto';
import { IUserResponse } from './user.interfaces';
import { ResponseUserMapper } from './mappers/userResponse.mapper';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { PasswordDto } from './dtos/password.dto';
import { UpdatePassword } from './dtos/updatePassword.dto';
import { ApiTags } from '@nestjs/swagger';
import { NewUserDto } from './dtos/newUser.dto';
import { User } from './entities/user.entity';

@ApiTags('users')
@Controller('/api/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}
  // @Get()
  // public async getAllUsers(): Promise<IUserResponse> {
  //   return 'Hello World!';
  // }
  @Get('/:idOrUsername')
  public async findUser(@Param() params: IdOrUsernameParam) {
    const user = await this.userService.findOneByIdOrUsername(
      params.idOrUsername,
    );
    return ResponseUserMapper.map(user);
  }

  @Post()
  public async addNewUsr(@Body() body: NewUserDto) {
    const user = await this.userService.create(body);
    return ResponseUserMapper.map(user);
  }

  @Patch('/:idOrUsername')
  public async updateUsername(
    @Param() params: IdOrUsernameParam,
    @Body() dto: UpdateUserDto,
  ): Promise<IUserResponse> {
    const user = await this.userService.updateUsername(
      params.idOrUsername,
      dto,
    );
    return ResponseUserMapper.map(user);
  }
  @Patch('/password/:idOrUsername')
  public async updatePassword(
    @Param() params: IdOrUsernameParam,
    @Body() dto: UpdatePassword,
  ): Promise<IUserResponse> {
    const user = await this.userService.updatePassword(
      params.idOrUsername,
      dto,
    );
    return ResponseUserMapper.map(user);
  }
  public async deleteUser(
    @Param() params: IdOrUsernameParam,
    @Body() dto: PasswordDto,
  ): Promise<void> {
    await this.userService.delete(params.idOrUsername, dto);
  }
}
