import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { ConfigService } from '../config/config.service';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MedicalAppointmentService {
    constructor(
        private httpClient: HttpClient,
        private authService: AuthService,
        private configService: ConfigService
    ) {}

    fetchAppointments() {
        // /patients/{patientId}/appointments
        let patientId = this.authService.getCurrentPatientId();
        return this.httpClient
            .get(
                `${this.configService.getBaseUrl()}/api/patients/${patientId}/appointments`,
                this.configService.getAuthHeaders()
            )
            .pipe(
                map((res: any) => {
                    //console.log(res);
                    return res.data.map(app => {
                        return {
                            id: app.id,
                            address: `${app.office.address}, ${
                                app.office.suburb
                            }`,
                            name: app.office.doctor.name,
                            hour: app.hour,
                            date: app.date,
                            cost: app.cost ? app.cost : 0,
                            service: app.medical_service.name,
                            lat: app.office.latitude,
                            long: app.office.longitude
                        };
                    });
                })
            );
    }
}
