import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { randomBytes } from 'crypto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class RefreshTokenService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async generate(userId: number): Promise<string> {
    const token = randomBytes(64).toString('hex');
    await this.cacheManager.set(
      `refresh:${token}`,
      userId,
      7 * 24 * 3600 * 1000
    );
    return token;
  }

  async validate(token: string): Promise<number | null> {
    const value = await this.cacheManager.get<number>(`refresh:${token}`);
    return typeof value === 'number' ? value : null;
  }

  async revoke(token: string) {
    await this.cacheManager.del(`refresh:${token}`);
  }
}
