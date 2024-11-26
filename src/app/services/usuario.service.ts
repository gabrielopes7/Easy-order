import { environment } from './environment';
import { IUsuario } from './../interfaces/iusuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IRegistroUsuario } from '../interfaces/iregistroUsuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrlLogar = environment.apiBaseUrl + '/LoginUsuario';
  private apiUrlCriar = environment.apiBaseUrl + '/RegistrarUsuario';

  constructor(private client: HttpClient, private router: Router) {}

  logarUsuario(usuario: IUsuario): Observable<any> {
    const httpHeaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
    };

    return this.client.post<any>(this.apiUrlLogar, usuario, httpHeaders).pipe(
      tap((response) => {
        sessionStorage.setItem('authUsuario', JSON.stringify(response));
      })
    );
  }

  criarUsuario(registrarUsuario: IRegistroUsuario): Observable<any> {
    const httpHeaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origins': '*',
      }),
    };

    return this.client.post<any>(this.apiUrlCriar, registrarUsuario, httpHeaders).pipe(
      tap((response) => {
        console.log(response);
      })
    )
  }

  usuarioLogado(): boolean {
    return sessionStorage.getItem('authUsuario') ? true : false;
  }

  obterTokenUsuario() {
    return sessionStorage.getItem('authUsuario');
  }

  deslogar() {
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
}
