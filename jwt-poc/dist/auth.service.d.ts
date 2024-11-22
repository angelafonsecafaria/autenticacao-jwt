import { JwtService } from "@nestjs/jwt";
import { User } from "./app.service";
export declare class AuthService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    createToken(user: User): Promise<string>;
    checkToken(token: string): Promise<any>;
    createRefreshToken(user: User): Promise<string>;
    checkRefreshToken(token: string): Promise<any>;
}
