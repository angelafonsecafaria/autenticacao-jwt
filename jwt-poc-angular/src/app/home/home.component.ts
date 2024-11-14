import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  usuarios!: any;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.httpClient.get('http://localhost:3000/users').subscribe(
      (res) => {
        // Sucesso - res contém a resposta da requisição
        this.usuarios = res;
        console.log('Usuários recebidos:', res);
      },
      (error) => {
        // Erro - Se a requisição falhar
        console.error('Erro ao buscar usuários:', error);
        // Aqui você pode adicionar um tratamento de erro, como exibir uma mensagem para o usuário
      }
    );
  }
}
