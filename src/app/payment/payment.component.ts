import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { RouterExtensions, PageRoute } from 'nativescript-angular/router';
import { PaymentService } from './payment.service';
import { ModalDialogService } from 'nativescript-angular/modal-dialog';
import { PaymentSelectionModalComponent } from './payment-selection-modal/payment-selection-modal.component';
import { PlatformLocation } from '@angular/common';

@Component({
    selector: 'ns-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
    constructor(
        private router: RouterExtensions,
        private paymentService: PaymentService,
        private pageRoute: PageRoute,
        private modalDialogService: ModalDialogService,
        private vcRef: ViewContainerRef
    ) {}

    ngOnInit() {}

    goBack() {
        this.router.backToPreviousPage();
    }

    addPaymentMethod() {
        this.router.navigate(['/add-payment']);
        // this.modalDialogService
        //     .showModal(PaymentSelectionModalComponent, {
        //         fullscreen: false,
        //         viewContainerRef: this.vcRef
        //     })
        //     .then((res: any) => {
        //         switch (res) {
        //             case 'card':
        //                 setTimeout(() => {
        //                     this.router.navigate(['/add-payment']);
        //                 }, 500)
        //                 break;
        //             case 'cash':
        //                 console.log('cash');
        //                 break;
        //         }
        //     });
        // //
    }
}
