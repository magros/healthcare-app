import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config/config.service';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class PaymentService {
    constructor(
        private httpClient: HttpClient,
        private configService: ConfigService,
        private authService: AuthService
    ) {}

    createCharge(doctorId: number | string) {}

    fetchPaymentMethods() {
        let userId = this.authService.getCurrentUserId();
        return this.httpClient.get(
            `${this.configService.getBaseUrl()}/api/users/${userId}/cards`,
            this.configService.getAuthHeaders()
        );
    }

    addPaymentMethod(payment, type) {
        let userId = this.authService.getCurrentUserId();
        return this.httpClient.post(
            `${this.configService.getBaseUrl()}/api/users/${userId}/cards`,
            {
                number: payment.number,
                expire_month: payment.expire_month,
                expire_year: payment.expire_year,
                cvv: payment.cvv,
                type: type
            },
            this.configService.getAuthHeaders()
        );
    }
}
