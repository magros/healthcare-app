import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config/config.service';

@Injectable()
export class ResultsService {
    constructor(private http: HttpClient, private configService: ConfigService) { }

    search(urlParameters) {
        let url = `${this.configService.getBaseUrl()}/api/doctors${urlParameters}`
        //console.log(url);
        return this.http.get(url)
    }
}
