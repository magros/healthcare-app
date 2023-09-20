import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config/config.service';

@Injectable({providedIn: 'root'})
export class MapSearchService {
    constructor(private httpClient: HttpClient, private configService: ConfigService) { }

    findOffices(searchUrl) {
        return this.httpClient
            .get(`${this.configService.getBaseUrl()}/api/offices${searchUrl}`)
    }

}
