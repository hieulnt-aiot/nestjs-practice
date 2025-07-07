import { Request } from 'express';

export default function extractTokenFromRequest(req: Request): string | null {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return null;
  const [bearer, token] = authHeader.split(' ');
  return bearer === 'Bearer' ? token : null;
}
