import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config/config.service';
import {
    setBoolean,
    setString,
    getString,
    getBoolean,
    remove
} from 'tns-core-modules/application-settings/application-settings';
import { Subject } from 'rxjs';

@Injectable()
export class AuthService {
    private _user = new Subject<any>();

    constructor(
        private httpClient: HttpClient,
        private configService: ConfigService
    ) {}

    get userState() {
        return this._user.asObservable();
    }

    updateUser(userVal) {
        this._user.next(userVal);
    }

    doLogin(user, password) {
        return this.httpClient.post(
            `${this.configService.getBaseUrl()}/auth/login`,
            {
                email: user,
                password: password
            },
            this.configService.getBaseHeaders()
        );
    }

    storeUserData(user) {
        //console.log(user)
        setBoolean('isLoggedIn', true);
        setString('apiToken', user.api_token);
        setString('user', JSON.stringify(user));
        setString('patient', JSON.stringify(user.patient_id));
        this.updateUser(user.user);
    }

    loadUserData() {
        let user = JSON.parse(getString('user')).user;
        this.updateUser(user);
    }

    isLoggedIn() {
        return getBoolean('isLoggedIn', false);
    }

    logout() {
        remove('isLoggedIn');
        remove('apiToken');
        remove('user');
        remove('patient');
    }

    registerUser(registerObject) {
        return this.httpClient.post(
            `${this.configService.getBaseUrl()}/auth/register`,
            {
                email: registerObject.email,
                name: registerObject.name,
                password: registerObject.password,
                password_confirmation: registerObject.passwordConfirm
            },
            this.configService.getBaseHeaders()
        );
    }

    getCurrentUserId() {
        return JSON.parse(getString('user')).user.id;
    }

    getCurrentPatientId() {
        return JSON.parse(getString('patient'));
    }

    loginWithFacebook(token) {
        return this.httpClient.post(
            `${this.configService.getBaseUrl()}/auth/facebook`,
            {
                token: token
            }
        );
    }

    loginWithGoogle(token) {
        return this.httpClient.post(
            `${this.configService.getBaseUrl()}/auth/google`,
            {
                token: token
            }
        );
    }
}
