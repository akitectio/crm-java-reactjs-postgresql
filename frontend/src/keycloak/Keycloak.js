import Keycloak from 'keycloak-js';

const keycloakConfig = {
    url: "http://localhost:8080",
    realm: "dev-teams",
    // clientId: "react-payment-prod"
    clientId: "reactjs"
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;