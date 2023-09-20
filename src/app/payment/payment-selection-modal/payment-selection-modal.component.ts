import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  selector: 'ns-payment-selection-modal',
  templateUrl: './payment-selection-modal.component.html',
  styleUrls: ['./payment-selection-modal.component.css']
})
export class PaymentSelectionModalComponent implements OnInit {

  constructor(
    private modalParams: ModalDialogParams,
    private router: RouterExtensions) { }

  ngOnInit() {
  }

  closeModal() {
      this.modalParams.closeCallback()
  }

  addNewCard() {
    this.modalParams.closeCallback('card')
  }

  addCash() {
    this.modalParams.closeCallback('cash')
  }

}
