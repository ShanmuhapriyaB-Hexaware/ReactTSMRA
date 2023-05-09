// Add bellow trusted domains, access tokens will automatically injected to be send to
// trusted domain can also be a path like https://www.myapi.com/users,
// then all subroute like https://www.myapi.com/useers/1 will be authorized to send access_token to.

// Domains used by OIDC server must be also declared here
// eslint-disable-next-line @typescript-eslint/no-unused-vars

const trustedDomains = {
    default:["https://demo.duendesoftware.com", "https://kdhttps.auth0.com", "https://dev-5188428.okta.com"],
    config_classic: ["https://demo.duendesoftware.com"] ,
    config_google: ["https://oauth2.googleapis.com", "https://openidconnect.googleapis.com", "https://accounts.google.com"],
    config_auth0: ["https://dev-8v5k0nia.us.auth0.com/"],
    config_okta: ["https://dev-5188428.okta.com"],
    config_azure: ["https://login.microsoftonline.com/7c0c36f5-af83-4c24-8844-9962e0163719/"],
};