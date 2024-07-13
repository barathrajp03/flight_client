import { Component } from '@angular/core';
import { Payment, upiDetails, cardDetails } from './payment';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [],
templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'], 
})
export class PaymentComponent {
  paymentDetails: Payment;
  upiInfo?: upiDetails;
  cardInfo?: cardDetails;
  selectedPaymentMethod:string = 'upi' //default
  constructor(
    paymentId: number,
    userEmail: string,
    paymentDate: string,
    amount: number,
    isPaymentSuccessful: boolean,
    paymentVia: string
  ) {
    this.paymentDetails = {
      paymentId: paymentId,
      userEmail: userEmail,
      paymentDate: paymentDate,
      amount: amount,
      isPaymentSuccessful: isPaymentSuccessful,
      paymentVia: paymentVia,
    };
  }

  paymentInitiate(payInfo: any) {
    switch (this.selectedPaymentMethod) {
      case 'card': {
        this.handleCard(payInfo);
        break
      }
      case 'upi': {
        this.handleUPI(payInfo);
        break
      }
      default: {
      }
    }
  }

  handleUPI(payment_UPI: upiDetails): Boolean {
    this.upiInfo = payment_UPI
    return true;
  }

  handleCard(payment_CARD: cardDetails): Boolean {
    this.cardInfo = payment_CARD
    return true;
  }
}
