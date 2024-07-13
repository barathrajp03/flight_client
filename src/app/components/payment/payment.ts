export type cardDetails = {
  cardNumber: number;
  cvv: null;
  isDebitCard: Boolean;
  cardExpiry: string;
};

export type upiDetails = {
  upiId: string;
};

export type Payment = {
  paymentId: number;
  userEmail: string;
  paymentDate: string;
  amount: number;
  isPaymentSuccessful: boolean;
  paymentVia:string
}
