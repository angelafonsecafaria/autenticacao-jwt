import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth-guard.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' }, 
    { path: 'login', component: LoginComponent }, 
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] }, 
];