import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '~/app/auth/auth.service';
import { ConfigService } from '~/app/config/config.service';

@Injectable()
export class CommentService {
    constructor(
        private httpClient: HttpClient,
        private authService: AuthService,
        private configService: ConfigService
    ) {}

    saveComment(doctorId, comments, rate) {
        return this.httpClient.post(
            `${this.configService.getBaseUrl()}/api/patients/${this.authService.getCurrentPatientId()}/opinions`,
            {
                doctor_id: doctorId,
                commentaries: comments,
                rate: rate
            },
            this.configService.getAuthHeaders()
        );
    }
}
