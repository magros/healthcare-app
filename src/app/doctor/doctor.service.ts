import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config/config.service';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DoctorService {
    constructor(
        private httpClient: HttpClient,
        private configService: ConfigService,
        private authService: AuthService
    ) {}

    findDoctor(doctorId: number | string) {
        return this.httpClient.get(
            `${this.configService.getBaseUrl()}/api/doctors/${doctorId}`,
            this.configService.getBaseHeaders()
        );
    }

    setAsFavorite(doctorId) {
        let patientId = this.authService.getCurrentPatientId();
        return this.httpClient.post(
            `${this.configService.getBaseUrl()}/api/patients/${patientId}/toggle-doctor`,
            {
                doctorId
            },
            this.configService.getAuthHeaders()
        );
    }
}
