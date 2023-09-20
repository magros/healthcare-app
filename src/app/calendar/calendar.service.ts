import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config/config.service';
import { map } from 'rxjs/internal/operators';
import { of } from 'rxjs';

@Injectable()
export class CalendarService {
    constructor(
        private httpClient: HttpClient,
        private configService: ConfigService
    ) {}

    getDoctorOffices(doctorId) {
        return this.httpClient
            .get<any>(
                `${this.configService.getBaseUrl()}/api/doctors/${doctorId}`,
                this.configService.getBaseHeaders()
            )
            .pipe(
                map(res => {
                    return res.data.offices.map(i => {
                        return { value: i.id, display: i.description };
                    });
                })
            );
    }

    getDoctorServices(doctorId) {
        return this.httpClient
            .get<any>(
                `${this.configService.getBaseUrl()}/api/doctors/${doctorId}`,
                this.configService.getBaseHeaders()
            )
            .pipe(
                map(res => {
                    return res.data.medical_services.map(i => {
                        return {
                            value: i.doctorMedicalServiceId,
                            display: i.name
                        };
                    });
                })
            );
    }

    getOfficeSchedule(officeId, query) {
        console.log(officeId, query);
        return this.httpClient
            .get<any>(
                `${this.configService.getBaseUrl()}/api/offices/${officeId}/schedule${query}`,
                this.configService.getBaseHeaders()
            )
            .pipe(
                map(res => {
                    console.log(res);
                    return res.data;
                })
            );
    }
}
