import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PaymentService } from '../payment.service';
import { PlatformLocation } from '@angular/common';

@Component({
    selector: 'ns-payment-list',
    templateUrl: './payment-list.component.html',
    styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {
    @Output() tapItem: EventEmitter<{ cardId: string }> = new EventEmitter();

    cards = [];
    constructor(private paymentService: PaymentService, private location: PlatformLocation) {}

    ngOnInit() {
        this.paymentService.fetchPaymentMethods().subscribe(
            (res: any) => {
                console.log(res);
                this.cards = res.data;
            },
            err => {
                console.log(err);
            }
        );

        this.location.onPopState(() => {
            this.paymentService.fetchPaymentMethods().subscribe(
                (res: any) => {
                    console.log(res);
                    this.cards = res.data;
                },
                err => {
                    console.log(err);
                }
            );
        })
    }

    onTapItem(args) {
        this.tapItem.emit({ cardId: this.cards[args.index].id });
    }
}
