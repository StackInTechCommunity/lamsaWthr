import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { GetUserParams } from './dtos/getUser.dto';
import { IUserResponse } from './user.interfaces';
import { ResponseUserMapper } from './mappers/userResponse.mapper';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { PasswordDto } from './dtos/password.dto';
import { UpdatePassword } from './dtos/updatePassword.dto';

@Controller('/api/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}
  @Get()
  getHello(): string {
    return 'Hello World!';
  }
  @Get('/:idOrUsername')
  public async findUser(
    @Param() params: GetUserParams,
  ): Promise<IUserResponse> {
    const user = await this.userService.findOneByIdOrUsername(
      params.idOrUsername,
    );
    return ResponseUserMapper.map(user);
  }

  @Patch('/:idOrUsername')
  public async updateUsername(
    @Param() params: GetUserParams,
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
    @Param() params: GetUserParams,
    @Body() dto: UpdatePassword,
  ): Promise<IUserResponse> {
    const user = await this.userService.updatePassword(
      params.idOrUsername,
      dto,
    );
    return ResponseUserMapper.map(user);
  }
  public async deleteUser(
    @Param() params: GetUserParams,
    @Body() dto: PasswordDto,
  ): Promise<void> {
    await this.userService.delete(params.idOrUsername, dto);
  }
}
