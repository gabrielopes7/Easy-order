import { IUsuario } from './../interfaces/iusuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrl = 'http://192.168.15.95:45455/api/LoginUsuario';

  constructor(private client: HttpClient, private router: Router) {}

  logarUsuario(usuario: IUsuario): Observable<any> {
    const httpHeaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }),
    };

    return this.client.post<any>(this.apiUrl, usuario, httpHeaders).pipe(
      tap((response) => {
        sessionStorage.setItem('authUsuario', response);
      })
    );
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
