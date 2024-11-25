import { CanActivateFn, Router } from '@angular/router';
import { UsuarioService } from '../usuario.service';
import { inject } from '@angular/core';

export const usuarioAutenticadoGuard: CanActivateFn = (route, state) => {
  const usuarioService = inject(UsuarioService);
  const router = inject(Router);

  const usuarioLogado = usuarioService.usuarioLogado();

  if (usuarioLogado) {
    return true;
  }else{
    router.navigate(['/login']);
    return false;
  }
};
