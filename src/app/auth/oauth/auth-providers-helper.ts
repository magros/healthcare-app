import { configureTnsOAuth, TnsOAuthClient, ITnsOAuthTokenResult } from 'nativescript-oauth2'

import {
    TnsOaProvider,
    TnsOaProviderGoogle,
    TnsOaProviderOptionsGoogle,
    TnsOaProviderFacebook,
    TnsOaProviderOptionsFacebook
} from 'nativescript-oauth2/providers'

export function configureOAuthProviders() {
    const googleProvider = configureOAuthProviderGoogle();
    const facebookProvider = configureOAuthProviderFacebook();
    configureTnsOAuth([googleProvider, facebookProvider]);
}

export function configureOAuthProviderGoogle(): TnsOaProvider {
    const googleProviderOptions:TnsOaProviderOptionsGoogle = {
        openIdSupport: 'oid-full',
        clientId: '94968922809-a09mh520vqgrrjfgr58oa61kpar36her.apps.googleusercontent.com',
        redirectUri: 'com.googleusercontent.apps.94968922809-a09mh520vqgrrjfgr58oa61kpar36her:/auth"',
        urlScheme: 'com.googleusercontent.apps.94968922809-a09mh520vqgrrjfgr58oa61kpar36her',
        scopes: ['email', 'profile']
    }
    const googleProvider = new TnsOaProviderGoogle(googleProviderOptions);

    return googleProvider;
}

export function configureOAuthProviderFacebook(): TnsOaProvider {
    const facebookProviderOptions: TnsOaProviderOptionsFacebook = {
        clientId: '2395807317170889',
        clientSecret: 'd98eb89adc43563e98b89cadd0d34b91',
        scopes: ['email'],
        openIdSupport: 'oid-none',
        redirectUri: 'https://www.facebook.com/connect/login_success.html'
    }
    const facebookProvider = new TnsOaProviderFacebook(facebookProviderOptions);
    return facebookProvider;
}
