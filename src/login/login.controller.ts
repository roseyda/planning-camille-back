import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { TokenDto } from './dto/token.dto';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({ type: TokenDto })
  login(@Body() { login, password }: LoginDto): TokenDto {
    return {
      token: `Bearer ${this.loginService.login(login, password)}`,
    } as TokenDto;
  }
}
