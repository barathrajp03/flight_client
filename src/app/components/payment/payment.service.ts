import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Payment } from './payment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  
  private baseUrl = 'http://localhost:8086/payment';

  constructor(private http: HttpClient, private authService: AuthService) { }

  // Get token from AuthService
  private getHttpOptions() {
    const token = this.authService.getToken();
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    };
  }

  // Process Payment
  processPayment(userEmail: string, amount: number): Observable<Payment> {
    const url = `${this.baseUrl}/process/${userEmail}/${amount}`;
    return this.http.post<Payment>(url, null, this.getHttpOptions());
  }
}
