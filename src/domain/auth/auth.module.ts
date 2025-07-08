import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { RefreshTokenService } from './tokens/refresh-token.service';
import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { UsersModule } from '../users/users.module';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from 'src/common/validation/validation.pipe';

@Module({
  imports: [UsersModule, JwtModule.register({}), CacheModule.register()],
  providers: [
    AuthService,
    RefreshTokenService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
