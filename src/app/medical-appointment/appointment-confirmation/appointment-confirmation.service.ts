import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from '../../config/config.service';
import {map} from "rxjs/internal/operators";
import { AuthService } from '~/app/auth/auth.service';

@Injectable()
export class AppointmentConfirmationService {

    constructor(private http: HttpClient, private configService: ConfigService, private authService: AuthService) {}

    findOffice(officeId) {
        return this.http.get<any>(
            `${this.configService.getBaseUrl()}/api/offices/${officeId}`,
            this.configService.getBaseHeaders())
            .pipe(map(res => {
                return res.data
            }))
    }

    findDoctorService(doctorId, doctorServiceId) {
        return this.http.get<any>(
            `${this.configService.getBaseUrl()}/api/doctors/${doctorId}/services/${doctorServiceId}`,
            this.configService.getBaseHeaders())
            .pipe(map(res => {
                return {
                    doctorId: res.pivot.doctor_id,
                    medicalServiceId: res.pivot.medical_service_id,
                    cost: res.pivot.cost,
                    serviceName: res.name
                }
            }))
    }

    appointDate(officeId, medicalServiceId, hour, date) {
        // /api/patients/{patientId}/appointments
        let userId = this.authService.getCurrentPatientId()
        return this.http.post<any>(
            `${this.configService.getBaseUrl()}/api/patients/${userId}/appointments`,
            {
                office_id: officeId,
                doctor_medical_service_id: medicalServiceId,
                hour: hour,
                date: date
            },
            this.configService.getAuthHeaders())
    }


}
