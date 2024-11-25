import { map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { SortDirection } from '@angular/material/sort';
import { usuarioAutenticadoGuard } from './guards/usuario-autenticado.guard';
import { Usuario } from '../components/home/home.component';

@Injectable({
  providedIn: 'root'
})
export class ListaUsuarioService {

  private apiUrl = "http://192.168.15.95:45457/api/pegarListaUsuario/";

  constructor(private httpClient: HttpClient) {}


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

}
