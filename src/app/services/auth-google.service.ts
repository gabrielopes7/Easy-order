import { Injectable, inject, signal } from '@angular/core';

import { Router } from '@angular/router';

import { OAuthService } from 'angular-oauth2-oidc';

import { authConfig } from '../auth-config';

@Injectable({
  providedIn: 'root',
})
export class AuthGoogleService {
  private oAuthService = inject(OAuthService);
  private router = inject(Router);

  profile = signal<any>(null);

  constructor() {
    this.iniciarConfiguracao();
  }

  iniciarConfiguracao() {
    this.oAuthService.configure(authConfig);

    this.oAuthService.setupAutomaticSilentRefresh();

    this.oAuthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      if (this.oAuthService.hasValidAccessToken()) {
        this.profile.set(this.oAuthService.getIdentityClaims());
        console.log('User is authenticated.');
        this.router.navigate(['/home']);
      } else {
        console.log("Don't work");
      }
    });
  }

  login() {
    this.oAuthService.initLoginFlow();
  }

  logout() {
    this.oAuthService.revokeTokenAndLogout();

    this.oAuthService.logOut();
  }

  buscarProfile() {
    return this.profile();
  }

  usuarioLogadoComGoogle(): boolean {
    return this.oAuthService.hasValidAccessToken();
  }
}
