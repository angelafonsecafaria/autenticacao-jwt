"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const usuarios = [
    {
        id: 1,
        nome: 'João Silva',
        email: 'joao.silva@example.com'
    },
    {
        id: 2,
        nome: 'Maria Oliveira',
        email: 'maria.oliveira@example.com'
    },
    {
        id: 3,
        nome: 'Carlos Pereira',
        email: 'carlos.pereira@example.com'
    },
    {
        id: 4,
        nome: 'Ana Costa',
        email: 'ana.costa@example.com'
    },
    {
        id: 5,
        nome: 'Lucas Martins',
        email: 'lucas.martins@example.com'
    },
    {
        id: 6,
        nome: 'Patrícia Souza',
        email: 'patricia.souza@example.com'
    },
    {
        id: 7,
        nome: 'Rafael Rocha',
        email: 'rafael.rocha@example.com'
    },
    {
        id: 8,
        nome: 'Fernanda Alves',
        email: 'fernanda.alves@example.com'
    },
    {
        id: 9,
        nome: 'Gustavo Lima',
        email: 'gustavo.lima@example.com'
    },
    {
        id: 10,
        nome: 'Juliana Gomes',
        email: 'juliana.gomes@example.com'
    }
];
let AppService = class AppService {
    getUsers() {
        console.log("Retornou todos usuários!");
        return usuarios;
    }
    getUser(email) {
        return usuarios.find((usuario) => usuario.email === email);
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
//# sourceMappingURL=app.service.js.map