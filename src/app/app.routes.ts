import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { usuarioAutenticadoGuard } from './services/guards/usuario-autenticado.guard';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent},
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [usuarioAutenticadoGuard],
  },
];
