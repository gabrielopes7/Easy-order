import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  clientId:
    '392338445527-13rb4h14vbf29hfjl8nrmtaopol9bn3m.apps.googleusercontent.com',
  redirectUri: "http://localhost:4200/login",
  scope: 'openid profile email',
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
};
