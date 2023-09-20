import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../payment.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterExtensions } from 'nativescript-angular';

@Component({
    selector: 'ns-add-payment',
    templateUrl: './add-payment.component.html',
    styleUrls: ['./add-payment.component.css']
})
export class AddPaymentComponent implements OnInit {
    cardNumber: string;
    cvv: string;
    expYear: string;
    expMonth: string;
    validCard: boolean;
    validCvv: boolean;
    validMonth: boolean;
    validYear: boolean;

    constructor(
        private paymentService: PaymentService,
        private router: RouterExtensions
    ) {}

    ngOnInit() {}

    onCardExtractedValueChange(args) {
        if (args.value.length <= 16) this.cardNumber = args.value;
    }

    onCardCompletedChage(args) {
        this.validCard = args.value;
    }

    onCvvExtractedValueChange(args) {
        this.cvv = args.value;
    }

    onCvvCompletedChage(args) {
        this.validCvv = args.value;
    }

    onExpYearExtractedValueChange(args) {
        this.expYear = args.value;
    }

    onExpYearCompletedChage(args) {
        this.validYear = args.value;
    }

    onExpMonthExtractedValueChange(args) {
        this.expMonth = args.value;
    }

    onExpMonthCompletedChage(args) {
        this.validMonth = args.value;
    }

    addCard() {
        console.log(this.cardNumber, this.cvv, this.expMonth, this.expYear);
        //console.log(this.form.value)
        if (
            this.validCard &&
            this.validCvv &&
            this.validMonth &&
            this.validYear
        ) {
            this.paymentService
                .addPaymentMethod(
                    {
                        number: this.cardNumber,
                        expire_month: this.expMonth,
                        expire_year: this.expYear,
                        cvv: this.cvv
                    },
                    'VISA'
                )
                .subscribe(
                    (res: any) => {
                        console.log(res);
                        alert('Tarjeta agregada correctamente');
                        this.resetValues();
                        this.router.back();
                    },
                    (err: any) => {
                        console.log(err);
                        if(err.status == 422) {
                            alert('Ha ingresado valores inválidos');
                            return
                        }
                        alert('Ocurrió un error, por favor intente más tarde');
                        this.resetValues();
                        this.router.back();
                    }
                );
        }
        return;
    }
    resetValues() {
        this.cardNumber = '';
        this.cvv = '';
        this.expYear = '';
    }
}
