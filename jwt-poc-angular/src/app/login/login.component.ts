import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { FormsModule } from '@angular/forms';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email!: string;
  senha!: string;

  constructor(private router: Router, 
    private authService: AuthServiceService) {}

  onLogin(): void {
    this.router.navigate(['/home'])
  }

  realizarLogin(): void {
    const senhaCriptografada = this.criptografarSenha(this.senha);  // Criptografa a senha antes de enviar para o backend
    console.log('Senha criptografada:', senhaCriptografada);
    this.authService.login(this.email, senhaCriptografada).subscribe(
      (res) => { // Sucesso
        if (res) {
          this.authService.saveToken(res.token);
          this.onLogin();
        }
      },
      (error) => { // Erro
        console.error('Erro no login: Login não permitido!', error);
      }
    );
  }  

  // Método para criptografar a senha usando SHA-256
  criptografarSenha(senha: string): string {
    return CryptoJS.SHA256(senha).toString(CryptoJS.enc.Base64);  // Retorna a senha criptografada em base64
  }

}
