import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment.component';
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { SharedModule } from '../shared/shared.module';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import {
    NativeScriptHttpModule,
    ModalDialogService
} from 'nativescript-angular';
import { PaymentService } from './payment.service';
import { PaymentListComponent } from './payment-list/payment-list.component';
import { AddPaymentComponent } from './add-payment/add-payment.component';
import { InputMaskModule } from 'nativescript-input-mask/angular';
import { PaymentSelectionModalComponent } from './payment-selection-modal/payment-selection-modal.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        TNSFontIconModule,
        NativeScriptCommonModule,
        SharedModule,
        NativeScriptFormsModule,
        NativeScriptHttpModule,
        InputMaskModule,
        ReactiveFormsModule
    ],
    exports: [PaymentListComponent],
    declarations: [
        PaymentComponent,
        PaymentListComponent,
        AddPaymentComponent,
        PaymentSelectionModalComponent
    ],
    providers: [PaymentService, ModalDialogService],
    schemas: [NO_ERRORS_SCHEMA]
})
export class PaymentModule {}
