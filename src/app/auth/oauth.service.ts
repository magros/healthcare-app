import { Injectable } from '@angular/core';
import {TnsOAuthClient, ITnsOAuthTokenResult} from 'nativescript-oauth2'

@Injectable()
export class OAuthService {
    private client: TnsOAuthClient = null

    constructor() { }

    public tnsOauthLogin(providerType): Promise<ITnsOAuthTokenResult> {
        this.client = new TnsOAuthClient(providerType)

        return new Promise<ITnsOAuthTokenResult>((res, rej) => {
            this.client.loginWithCompletion((tokenResult: ITnsOAuthTokenResult, error) => {
                if(error) {
                    console.log("There was an error logging in")
                    console.log(error)
                    rej(error)
                } else {
                    console.log("Logged in successfully");
                    console.log(tokenResult)
                    res(tokenResult)
                    
                }
            })
        })
    }

    public tnsOauthLogout() {
        if(this.client) {
            this.client.logout();
        }
    }
}
