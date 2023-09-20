import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config/config.service';
import { map } from 'rxjs/operators'
import { ValueList } from 'nativescript-drop-down';
import { Observable } from 'rxjs';

@Injectable()
export class SearchService {
    constructor(
        private configService: ConfigService,
        private http: HttpClient) {}

    getSpecialities() {
        return this.http.get<any>(
            `${this.configService.getBaseUrl()}/api/specialities`,
            this.configService.getBaseHeaders())
            .pipe(map(res => {
                return res.data.map(s => {return {value: s.id, display: s.description}})
            }))
    }

    getAssuranceCompanies() {
        return this.http.get<any>(
            `${this.configService.getBaseUrl()}/api/insurers`,
            this.configService.getBaseHeaders())
            .pipe(map(res => {
                return res.data.map(i => {return {value: i.id, display: i.name}})
            }))
    }

    getHospitals() {
        return this.http.get<any>(
            `${this.configService.getBaseUrl()}/api/hospitals`,
            this.configService.getBaseHeaders())
            .pipe(map(res => {
                return res.data.map(h => {return {value: h.id, display: h.name}})
            }))
    }

    getLocations() {
        return this.http.get<any>(
            `${this.configService.getBaseUrl()}/api/states`,
            this.configService.getBaseHeaders())
            .pipe(map(res => {
                return res.data.map(o => {
                    return {value: o.id, display: o.name}
                })
            }))
    }

    getCurrentLocation(longitude, latitude) {
        let url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude + "&sensor=true&key=" + this.configService.getMapsAPiKey();
        return this.http.get(url)
            .pipe(
                map((res: any) => {
                    return res.results[0].address_components[4].long_name
                })
            )
    }

}
