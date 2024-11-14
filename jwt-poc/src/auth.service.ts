
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "./app.service";

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) { }

    async createToken(user: User) {
        return this.jwtService.sign({ user });
    }

    async checkToken(token: string) {
        try {
            return this.jwtService.verify(token.replace("Bearer ", ""));
        } catch (err) {
            return false;
        }
    }
}