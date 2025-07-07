import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenService } from './tokens/refresh-token.service';
import { AuthException } from './auth.exception';
import { AuthErrorCode } from './auth.errors';
import { plainToInstance } from 'class-transformer';
import { AuthResponseDto } from './dtos/auth-response.dtos';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly refreshTokenService: RefreshTokenService
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.userRepo.findOne({
      where: { email: dto.email },
    });

    if (existing)
      throw new AuthException({
        message: 'Email already exists',
        code: AuthErrorCode.EMAIL_EXISTS,
        status: HttpStatus.CONFLICT,
      });

    const hashed = await bcrypt.hash(dto.password, 10);
    const user = this.userRepo.create({
      email: dto.email,
      password: hashed,
      fullName: dto.fullName,
    });
    await this.userRepo.save(user);
    this.logger.log(`New user registered: ${user.email}`);

    const safeUser = plainToInstance(AuthResponseDto, user, {
      excludeExtraneousValues: true,
    });

    const { accessToken, refreshToken } = await this.generateTokens(user.id);

    return {
      success: true,
      message: 'User registered successfully',
      user: safeUser,
      accessToken,
      refreshToken,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.userRepo.findOne({ where: { email: dto.email } });
    if (!user) {
      this.logger.warn(`Failed login: ${dto.email} not found`);
      throw new AuthException({
        message: 'Invalid credentials',
        code: AuthErrorCode.INVALID_CREDENTIALS,
        status: HttpStatus.UNAUTHORIZED,
      });
    }

    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) {
      this.logger.warn(`Failed login: wrong password for ${dto.email}`);
      throw new AuthException({
        message: 'Invalid credentials',
        code: AuthErrorCode.INVALID_CREDENTIALS,
        status: HttpStatus.UNAUTHORIZED,
      });
    }

    const safeUser = plainToInstance(AuthResponseDto, user, {
      excludeExtraneousValues: true,
    });

    this.logger.log(`User logged in: ${user.email}`);
    const { accessToken, refreshToken } = await this.generateTokens(user.id);
    return {
      success: true,
      message: 'User login successfully',
      user: safeUser,
      accessToken,
      refreshToken,
    };
  }

  async generateTokens(userId: number) {
    const payload = { sub: userId };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '15m',
    });

    const refreshToken = await this.refreshTokenService.generate(userId);
    this.logger.debug(`Tokens generated for user ID: ${userId}`);
    return { accessToken, refreshToken };
  }
}
