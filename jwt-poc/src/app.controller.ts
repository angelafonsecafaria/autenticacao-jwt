import { Body, Controller, Get, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly authService: AuthService) { }

  @UseGuards(AuthGuard)
  @Get("users")
  getUsers() {
    return this.appService.getUsers();
  }

  @Post("login")
  async login(@Body() body) {
    const user = this.appService.getUser(body.email);
    if (user) {
      const token = await this.authService.createToken(user);
      const refreshToken = await this.authService.createRefreshToken(user);

      return { auth: true, token: token, refreshToken: refreshToken };
    }
    throw new UnauthorizedException();
  }

  // Rota de refresh token (Sem cookie)
  @Post('refresh-token')
  async refreshToken(@Body() body) {
    const { refreshToken } = body;  // Obtém o refresh token do corpo da requisição

    if (!refreshToken) {
      console.log("toneaa", body)
      throw new UnauthorizedException('Refresh token is missing');
    }
    // Verificar a validade do Refresh Token
    const userData = await this.authService.checkRefreshToken(refreshToken)

    if (!userData) {
      console.log("tobe")
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
    // Gerar um novo Access Token
    const newAccessToken = await this.authService.createToken(userData);

    return { auth: true, token: newAccessToken };  // Retorna o novo Access Token
  }

}
