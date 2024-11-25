import { AppComponent } from './app.component';
import { Routes } from '@angular/router';
import { usuarioAutenticadoGuard } from './services/guards/usuario-autenticado.guard';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent}
];
