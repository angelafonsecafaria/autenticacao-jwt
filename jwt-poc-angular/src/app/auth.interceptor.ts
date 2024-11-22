import { HttpEvent, HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { inject, Injector } from '@angular/core';
import { AuthServiceService } from './auth-service.service';  // Ajuste o caminho do serviço conforme necessário
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const authService = inject(AuthServiceService);

  // Não intercepta as requisições de login ou refresh token
  if (req.url.includes('/login') || req.url.includes('/refresh-token')) {
    return next(req);
  }

  // Recuperando o token de autenticação do localStorage ou cookie
  const token = authService.getToken();

  // Se o token existir, adiciona o cabeçalho Authorization
  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next(clonedRequest);
  }

  // Se não houver token, apenas passa a requisição sem modificações
  return next(req);
};

export const refreshTokenInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const authService = inject(AuthServiceService);
  const route = inject(Router);

  // Verifica se a requisição é para o refresh token (não deve passar pelo interceptor)
  if (req.url.includes('/refresh-token')) {
    return next(req);  // Passa a requisição sem interceptação
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Verifica se o erro é de token expirado (401) e não é a requisição para refresh token
      if (error.status === 403 || error.status === 401) {
        // Tenta fazer o refresh do token
        return authService.refreshToken().pipe(
          switchMap((newToken: string) => {
            // Salva o novo token no localStorage ou onde for armazenado
            authService.saveToken(newToken);

            // Clona a requisição original e adiciona o novo token ao cabeçalho
            const clonedRequest = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newToken}`,
              },
            });

            // Reenvia a requisição original com o novo token
            return next(clonedRequest);
          }),
          catchError((refreshError) => {
            route.navigate(['/login']);
            authService.removeToken();
            return throwError(() => refreshError)
          })
        );
      }

      // Se o erro não for 401 ou 403, apenas propaga o erro
      throw error;
    })
  );
};
