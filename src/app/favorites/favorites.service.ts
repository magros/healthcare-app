import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config/config.service';
import { AuthService } from '../auth/auth.service';
import { DoctorService } from '../doctor/doctor.service';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
    constructor(
        private httpClient: HttpClient,
        private configService: ConfigService,
        private authService: AuthService,
        private doctorService: DoctorService
    ) {}

    fetchFavoriteDoctors() {
        let patientId = this.authService.getCurrentPatientId();
        return this.httpClient.get(
            `${this.configService.getBaseUrl()}/api/patients/${patientId}/favorite-doctors`,
            this.configService.getAuthHeaders()
        );
    }
}
