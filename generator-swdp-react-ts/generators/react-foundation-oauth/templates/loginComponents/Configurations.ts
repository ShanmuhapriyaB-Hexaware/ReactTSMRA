import { TokenRenewMode } from '@axa-fr/react-oidc';

export const configurationIdentityServer = {
    client_id: 'interactive.public.short',
    redirect_uri: window.location.origin + '/authentication/callback',
    silent_redirect_uri: window.location.origin + '/authentication/silent-callback',
    // silent_login_uri: window.location.origin+'/authentication/silent-login',
    scope: 'openid profile email api offline_access',
    authority: 'https://demo.duendesoftware.com',
    // authority_time_cache_wellknowurl_in_second: 60* 60,
    refresh_time_before_tokens_expiration_in_second: 40,
    service_worker_relative_url: '/OidcServiceWorker.js',
    service_worker_only: false,
    // storage: sessionStorage,
    // silent_login_timeout: 3333000
    // monitor_session: true,
    token_renew_mode: TokenRenewMode.access_token_invalid,
  };

export const configurationAuth0 = {
  client_id: 'ymeP2FxnoDJpZC4EH0nG0XpYu2qoVTTF',
  redirect_uri: 'http://localhost:4200/multi-auth/callback',
  scope: 'openid',
  authority: 'https://dev-8v5k0nia.us.auth0.com/',
  authority_configuration: {
    issuer: 'https://dev-8v5k0nia.us.auth0.com/',
    authorization_endpoint: 'https://dev-8v5k0nia.us.auth0.com/v2/authorize',
    token_endpoint: 'https://dev-8v5k0nia.us.auth0.com/v2/oauth/token',
    end_session_endpoint: 'https://dev-8v5k0nia.us.auth0.com/v2/logout',
  },
  refresh_time_before_tokens_expiration_in_second: 10,
  service_worker_relative_url: '/OidcServiceWorker.js',
  service_worker_only: false,
};

export const configurationOkta = {
    client_id: '0oa75f68i3uscgVog5d7',
    redirect_uri: 'http://localhost:4200/multi-auth/callback',
    scope: 'openid',
    authority: 'https://dev-5188428.okta.com',
    authority_configuration: {
      issuer: 'https://dev-5188428.okta.com',
      authorization_endpoint: 'https://dev-5188428.okta.com/oauth2/v1/authorize',
      token_endpoint: 'https://dev-5188428.okta.com/oauth2/v1/token',
      end_session_endpoint: 'https://dev-5188428.okta.com/oauth2/v1/logout',
    },
    refresh_time_before_tokens_expiration_in_second: 10,
    service_worker_relative_url: '/OidcServiceWorker.js',
    service_worker_only: false,
  };

  export const configurationAzure = {
    client_id: 'd902d2fe-31d9-4ec6-a686-35714707cb7a',
    redirect_uri: 'http://localhost:4200/multi-auth/callback',
    scope: 'openid profile email offline_access',
    authority: 'https://login.microsoftonline.com/7c0c36f5-af83-4c24-8844-9962e0163719/',
    authority_configuration: {
      issuer: 'https://login.microsoftonline.com/7c0c36f5-af83-4c24-8844-9962e0163719/v2.0',
      authorization_endpoint: 'https://login.microsoftonline.com/7c0c36f5-af83-4c24-8844-9962e0163719/oauth2/v2.0/authorize',
      token_endpoint: 'https://login.microsoftonline.com/7c0c36f5-af83-4c24-8844-9962e0163719/oauth2/v2.0/token',
      end_session_endpoint: 'https://login.microsoftonline.com/7c0c36f5-af83-4c24-8844-9962e0163719/oauth2/v2.0/logout',
    },
    refresh_time_before_tokens_expiration_in_second: 10,
    service_worker_relative_url: '/OidcServiceWorker.js',
    service_worker_only: false,
  };

  export const configurationGoogle = {
    client_id: '908893276222-f2drloh56ll0g99md38lv2k810d0nk0p.apps.googleusercontent.com',
    redirect_uri: `${window.location.origin}/multi-auth/callback-google`,
    silent_redirect_uri: window.location.origin + '/multi-auth/silent-callback-google',
    scope: 'openid profile email',
    authority: 'https://accounts.google.com/',
    service_worker_relative_url: '/OidcServiceWorker.js',
    service_worker_only: false,
    token_request_extras: {
        client_secret: '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',
    },
    monitor_session: false,
};



