import { Injectable, UnauthorizedException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';

@Injectable()
export class LoginService {
  login(login: string, password: string): string {
    if (!(login === process.env.ADMIN_LOGIN) || !(password === process.env.ADMIN_PASSWORD)) {
      throw new UnauthorizedException('invalid login or password');
    }

    return sign(
      {
        iss: login,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getHours() + 1),
      },
      process.env.JWT_PASSWORD
    );
  }
}
