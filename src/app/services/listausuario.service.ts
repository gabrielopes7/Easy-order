import { map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { SortDirection } from '@angular/material/sort';
import { S } from '@angular/cdk/keycodes';
import { ListaUsuario, Usuario } from '../components/tabela/tabela/tabela.component';
import { usuarioAutenticadoGuard } from './guards/usuario-autenticado.guard';

@Injectable({
  providedIn: 'root'
})
export class ListaUsuarioService {

  private apiUrl = "http://192.168.2.189:45455/api/getListaUsuario/";
  private apiTabelaUrl = "http://192.168.2.189:45455/api/getListaUsuarioTabela/";

  constructor(private httpClient: HttpClient,
              private router: Router) {}


  buscarListaUsuario(value: string) : Observable<Usuario[]>{
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
       'Access-Control-Allow-Origin': '*',
    })
    const httpParams = new HttpParams().set('search', value);

    const options ={
      headers: httpHeaders,
      params: httpParams
    }

    return this.httpClient.get<Usuario[]>(this.apiUrl, options).pipe(
      map(data => data.slice(0,100))
    );
  }

  buscarListaUsuarioTabela(order: SortDirection, page: number) : Observable<ListaUsuario>{
    const httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
         'Access-Control-Allow-Origin': '*',
      })

    const httpParams = new HttpParams().set('order', order).set('page', page);

    const options ={
      headers: httpHeaders,
      params: httpParams

    }

    return this.httpClient.get<ListaUsuario>(this.apiTabelaUrl, options);
  }

}
