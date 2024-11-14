import { HttpEvent, HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthServiceService } from './auth-service.service';  // Ajuste o caminho do serviço conforme necessário
import { Observable } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  // // Injetando o AuthServiceService dentro do interceptor
  const authService = inject(AuthServiceService);

  if (req.url.includes('/login')) {
    return next(req);
  }

  // Recuperando o token do cookie
  const token = authService.getToken();

  // Se o token existir, adicione o cabeçalho Authorization
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