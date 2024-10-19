import { CanActivateFn, Router } from '@angular/router';
import { UsuarioService } from '../usuario.service';
import { inject } from '@angular/core';
import { AuthGoogleService } from '../auth-google.service';

export const usuarioAutenticadoGuard: CanActivateFn = (route, state) => {
  const usuarioService = inject(UsuarioService);
  const authGoogleService = inject(AuthGoogleService);
  const router = inject(Router);

  const usuarioLogado = usuarioService.usuarioLogado();
  const usuarioLogadoGoogle = authGoogleService.usuarioLogadoComGoogle();

  if (usuarioLogado || usuarioLogadoGoogle) {
    return true;
  }else{
    router.navigate(['/login']);
    return false;
  }
};
