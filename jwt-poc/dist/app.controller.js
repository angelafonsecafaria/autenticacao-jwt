"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const auth_guard_1 = require("./auth.guard");
const auth_service_1 = require("./auth.service");
let AppController = class AppController {
    constructor(appService, authService) {
        this.appService = appService;
        this.authService = authService;
    }
    getUsers() {
        return this.appService.getUsers();
    }
    async login(body) {
        const user = this.appService.getUser(body.email);
        if (user) {
            const token = await this.authService.createToken(user);
            const refreshToken = await this.authService.createRefreshToken(user);
            return { auth: true, token: token, refreshToken: refreshToken };
        }
        throw new common_1.UnauthorizedException();
    }
    async refreshToken(body) {
        const { refreshToken } = body;
        if (!refreshToken) {
            console.log("toneaa", body);
            throw new common_1.UnauthorizedException('Refresh token is missing');
        }
        const userData = await this.authService.checkRefreshToken(refreshToken);
        if (!userData) {
            console.log("tobe");
            throw new common_1.UnauthorizedException('Invalid or expired refresh token');
        }
        const newAccessToken = await this.authService.createToken(userData);
        return { auth: true, token: newAccessToken };
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)("users"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Post)("login"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('refresh-token'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "refreshToken", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService, auth_service_1.AuthService])
], AppController);
//# sourceMappingURL=app.controller.js.map