import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicalAppointmentComponent } from './medical-appointment.component';
import { AppointmentConfirmationComponent } from './appointment-confirmation/appointment-confirmation.component';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';
import { SharedModule } from '../shared/shared.module';
import { AppointmentConfirmationService } from './appointment-confirmation/appointment-confirmation.service';
import { MedicalAppointmentService } from './medical-appointment.service';
import { PaymentModule } from '../payment/payment.module';
import { PaymentSelectionModalComponent } from './appointment-confirmation/payment-selection/payment-selection-modal.component';
import { AppointmentDetailComponent } from './appointment-detail/appointment-detail.component';

@NgModule({
    imports: [
        CommonModule,
        NativeScriptCommonModule,
        TNSFontIconModule,
        SharedModule,
        PaymentModule
    ],
    declarations: [
        MedicalAppointmentComponent,
        AppointmentConfirmationComponent,
        PaymentSelectionModalComponent,
        AppointmentDetailComponent
    ],
    providers: [AppointmentConfirmationService, MedicalAppointmentService],
    schemas: [NO_ERRORS_SCHEMA]
})
export class MedicalAppointmentModule {}
