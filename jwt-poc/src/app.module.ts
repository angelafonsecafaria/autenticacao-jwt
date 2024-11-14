import { Module } from "@nestjs/common/decorators";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthService } from "./auth.service";

 
@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: parseInt(process.env.EXPIRES)
      }
    })],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule { }
