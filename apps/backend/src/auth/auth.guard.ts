import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly API_KEY = process.env.API_KEY;

  canActivate(
    context: ExecutionContext,
  ): boolean | Observable<boolean> | Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];

    if (!apiKey) {
      throw new UnauthorizedException("Missing 'x-api-key' header");
    }

    if (apiKey !== this.API_KEY) {
      throw new UnauthorizedException('Invalid API Key');
    }

    return true;
  }
}
