

import { KeycloakConfig } from 'keycloak-angular';

let keycloakConfig: KeycloakConfig = {
  url: 'https://gunni.1qay.net/auth',
  realm: 'plan',
  clientId: 'plan-ui'
};

export const environment = {
  production: true,
  planBackendPath: "/api",
  keycloak: keycloakConfig
};
