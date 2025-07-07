import { JwtService } from '@nestjs/jwt';
import { User } from 'src/domain/users/entities/user.entity';

export default async function generateAccessToken(
  user: User,
  jwtService: JwtService
) {
  const payload = { sub: user.id, email: user.email };

  const accessToken = await jwtService.signAsync(payload, {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return accessToken;
}
