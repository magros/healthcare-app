import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular';

@Component({
    selector: 'ns-payment-selector-modal',
    templateUrl: './payment-selection-modal.component.html',
    styleUrls: ['./payment-selection-modal.component.css']
})

export class PaymentSelectionModalComponent implements OnInit {
    constructor(
        private modalArgs: ModalDialogParams
    ) { }

    ngOnInit() { }

    itemTapped(args) {
        this.modalArgs.closeCallback(args)
    }

    closeModal() {
        this.modalArgs.closeCallback(null)
    }


}
