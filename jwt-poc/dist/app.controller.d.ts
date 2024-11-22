import { AppService } from './app.service';
import { AuthService } from './auth.service';
export declare class AppController {
    private readonly appService;
    private readonly authService;
    constructor(appService: AppService, authService: AuthService);
    getUsers(): import("./app.service").User[];
    login(body: any): Promise<{
        auth: boolean;
        token: string;
        refreshToken: string;
    }>;
    refreshToken(body: any): Promise<{
        auth: boolean;
        token: string;
    }>;
}
