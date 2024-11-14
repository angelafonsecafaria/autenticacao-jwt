import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';    // Se você precisar de outros serviços
import { AppComponent } from './app/app.component';
import { authInterceptor } from './app/auth.interceptor';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

// Bootstrapping do componente standalone
bootstrapApplication(AppComponent, {
  providers: [
    // Usando provideHttpClient com interceptores
    provideHttpClient(
      withInterceptors([authInterceptor])  // Registrando o interceptor
    ),
    provideRouter(routes),
    CookieService  // Caso você use o CookieService
  ]
})
  .catch(err => console.error(err));
