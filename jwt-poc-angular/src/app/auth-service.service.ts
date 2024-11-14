import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private apiUrl = 'http://localhost:3000/login'; // URL da sua API

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(this.apiUrl, body, { withCredentials: true });
  }

  // Salvar o token no cookie
  saveToken(token: string): void {
    // Você pode definir um tempo de expiração para o cookie, caso queira
    this.cookieService.set('authToken', token, { expires: 1 }); // expira em 1 dia
  }

  // Recuperar o token do cookie
  getToken(): string | null {
    return this.cookieService.get('authToken');
  }

  // Remover o token do cookie (logout)
  removeToken(): void {
    this.cookieService.delete('authToken');
  }

   // Verificar se o usuário está autenticado (token existe)
   isAuthenticated(): boolean {
    return !!this.getToken(); // Retorna true se o token estiver presente, caso contrário, false
  }
}