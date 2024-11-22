
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "./app.service";

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) { }

    async createToken(user: User) {
        // O Access Token tem uma expiração curta, por exemplo, 15 minutos
        return this.jwtService.sign({ user });
    }

    async checkToken(token: string) {
        try {
            return this.jwtService.verify(token.replace("Bearer ", ""));
        } catch (err) {
            return false;
        }
    }

    // Método para criar o Refresh Token
    async createRefreshToken(user: User) {
        // O Refresh Token tem uma expiração mais longa, por exemplo, 7 dias
        return this.jwtService.sign({ user }, { expiresIn: '1d' });
    }

    // Método para verificar o Refresh Token
    async checkRefreshToken(token: string) {
        try {
            return this.jwtService.verify(token);
        } catch (err) {
            return false;
        }
    }
}