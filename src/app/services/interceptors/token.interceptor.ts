import { UsuarioService } from './../usuario.service';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  const usuarioService = inject(UsuarioService);
  const tokenUsuario = usuarioService.obterTokenUsuario();

  if(tokenUsuario){
    const newRequest = req.clone({
      headers: req.headers.set(
        "Authorization", `Bearer ${tokenUsuario}`

      )
    });

    return next(newRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          usuarioService.deslogar();
        }
        return throwError(() => new Error(error.message));
      })
    );
  }

  return next(req);
};
