import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { IUser } from './user.interfaces';
import { CommonService } from '../common/common.service';
import { compare, hash } from 'bcrypt';
import { isNull, isUndefined } from '../common/utils/validation.util';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { PasswordDto } from './dtos/password.dto';
import { isNumber, isNumberString, isUUID } from 'class-validator';
import { SLUG_REGEX } from '../common/consts/regex.const';
import { UpdatePassword } from './dtos/updatePassword.dto';
import { NewUserDto } from './dtos/newUser.dto';
import { UserSettings } from './entities/userSettings.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserSettings)
    private readonly settingsRepository: Repository<UserSettings>,
    private readonly commonService: CommonService,
  ) {}
  private throwUnauthorizedException(user: undefined | null | User): void {
    if (isUndefined(user) || isNull(user)) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  private async checkUsernameUniqueness(username: string): Promise<void> {
    const count = await this.userRepository.count({ where: { username } });

    if (count > 0) {
      throw new ConflictException('Username already in use');
    }
  }
  public async create(user: NewUserDto): Promise<User> {
    user.username = this.commonService.formatName(user.username);
    user.password = await hash(user.password, 10);
    const newUser = this.userRepository.create(user);
    const userSettings = this.settingsRepository.create();
    await this.commonService.saveEntity(this.settingsRepository, userSettings);
    newUser.settings = userSettings;
    await this.commonService.saveEntity(this.userRepository, newUser);
    return newUser;
  }

  public async findOneById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: { cities: true, settings: true },
    });
    this.commonService.checkEntityExistence(user, 'User');
    return user!;
  }
  public async findOneByUsername(
    username: string,
    forAuth: boolean,
  ): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { username },
      relations: {
        cities: true,
        settings: true,
      },
    });
    this.commonService.checkEntityExistence(user, 'User');
    if (forAuth) {
      this.throwUnauthorizedException(user);
    } else {
      this.commonService.checkEntityExistence(user, 'User');
    }
    return user!;
  }

  public async findOneByIdOrUsername(idOrUsername: string): Promise<User> {
    if (isUUID(idOrUsername)) {
      return this.findOneById(idOrUsername);
    }

    if (
      idOrUsername.length < 3 ||
      idOrUsername.length > 106 ||
      !SLUG_REGEX.test(idOrUsername)
    ) {
      throw new BadRequestException('Invalid username');
    }

    return this.findOneByUsername(idOrUsername, false);
  }
  public async updateUsername(
    userId: string,
    dto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.findOneByIdOrUsername(userId);
    const { username } = dto;

    if (!isUndefined(username) && !isNull(username)) {
      const formattedUsername = username.toLowerCase();

      if (user.username === formattedUsername) {
        throw new BadRequestException('Username should be different');
      }

      await this.checkUsernameUniqueness(formattedUsername);
      user.username = formattedUsername;
    }

    await this.commonService.saveEntity(this.userRepository, user);
    return user;
  }

  public async updatePassword(
    idOrUsername: string,
    dto: UpdatePassword,
  ): Promise<User> {
    const user = await this.findOneByIdOrUsername(idOrUsername);

    if (!(await compare(dto.password, user.password))) {
      throw new BadRequestException('Wrong password');
    }
    if (await compare(dto.newPassword, user.password)) {
      throw new BadRequestException('New password must be different');
    }

    user.password = await hash(dto.newPassword, 10);
    await this.commonService.saveEntity(this.userRepository, user);
    return user;
  }

  public async delete(userId: string, dto: PasswordDto): Promise<User> {
    const user = await this.findOneByIdOrUsername(userId);

    if (!(await compare(dto.password, user.password))) {
      throw new BadRequestException('Wrong password');
    }

    await this.commonService.removeEntity(this.userRepository, user);
    return user;
  }
}
