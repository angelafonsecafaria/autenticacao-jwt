import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private apiUrl = 'http://localhost:3000/login'; // URL da sua API
  private url!: string | null;

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

  saveRefreshToken(token: string ): void {
    this.cookieService.set('refreshToken', token, { expires: 1 }); // expira em 1 dia
  }
  // Recuperar o token do cookie
  getToken(): string | null {
    return this.cookieService.get('authToken');
  }

  getRefreshToken(): string {
    const refreshToken = this.cookieService.get('refreshToken');
    return refreshToken;
  }

  // Remover o token do cookie (logout)
  removeToken(): void {
    this.cookieService.delete('authToken');
    this.cookieService.delete('refreshToken'); 
  }

   // Verificar se o usuário está autenticado (token existe)
   isAuthenticated(): boolean {
    return !!this.getToken(); // Retorna true se o token estiver presente, caso contrário, false
  }

  // Método para fazer o refresh do token
  refreshToken(): Observable<string> {
    // Faz a chamada para o backend para obter um novo access token
    const refreshToken = this.getRefreshToken();
    return this.http.post<{ token: string }>(`http://localhost:3000/refresh-token`, { refreshToken }).pipe(
      // Retorna o novo token que será usado no interceptor
      map(response => response.token)
    );
  }

  setUrl(url: string): void {
    this.url = url;
  }

  getUrl(): string | null {
    return this.url;
  }

  clearUrl(): void {
    this.url = null;
  }
}