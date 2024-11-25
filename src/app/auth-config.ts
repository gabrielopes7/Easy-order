import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  clientId:
    '715133112767-1f59ur6v12hb3oj97gbd5am3d14f14pf.apps.googleusercontent.com',
  redirectUri: "http://localhost:4200/login",
  scope: 'openid profile email',
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
};
