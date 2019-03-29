

import { KeycloakConfig } from 'keycloak-angular';

let keycloakConfig: KeycloakConfig = {
  url: 'http://localhost:8081/auth',
  realm: 'plan',
  clientId: 'plan-ui'
};

export const environment = {
  production: true,
  planBackendPath: "/api",
  keycloak: keycloakConfig
};
