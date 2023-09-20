
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { getString } from 'tns-core-modules/application-settings/application-settings';

@Injectable({providedIn: 'root'})
export class ConfigService {

    private baseUrl: string = 'https://health-manager.sugo.com.mx'
    // private baseUrl: string = 'http://192.168.1.88'

    constructor() {}

    getBaseUrl(): string {
        return this.baseUrl;
    }

    getBaseHeaders(){
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        }
    }

    getAuthHeaders(){
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getString('apiToken')}`
            })
        }
    }

    getMapsAPiKey() {
        return 'AIzaSyCvQ_5h0CqOmbzwLws52T7yse02TrRxJQU'
    }

}
