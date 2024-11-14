import { Injectable } from '@nestjs/common';

export type User = {
  id: number,
  nome: string,
  email: string,
}

const usuarios: User[] = [
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

@Injectable()
export class AppService {

  getUsers() {
    console.log("Retornou todos usuários!");
    return usuarios;
  }

  getUser(email: string) {
    return usuarios.find((usuario: User) => usuario.email === email)
  }


}
