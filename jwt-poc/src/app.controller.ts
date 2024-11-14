import { Body, Controller, Get, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
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
      return { auth: true, token: token };
    }
    throw new UnauthorizedException();
  }

}
