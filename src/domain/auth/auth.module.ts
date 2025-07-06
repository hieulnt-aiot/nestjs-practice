import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { RefreshTokenService } from './tokens/refresh-token.service';
import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UsersModule,
    JwtModule.register({}),
    CacheModule.register(),
  ],
  providers: [AuthService, RefreshTokenService],
  controllers: [AuthController],
})
export class AuthModule {}
