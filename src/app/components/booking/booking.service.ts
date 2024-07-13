import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Booking } from './booking';
import { Observable } from 'rxjs';
import { Passenger } from '../passenger/passenger';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private baseUrl = 'http://localhost:8086/booking';

  constructor(private http: HttpClient, private authService: AuthService) {}
  tkn: string = '';

  private getHttpOptions() {
    const token = this.authService.getToken();
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    };
  }

  // Book Flight
  bookFlight(booking: Booking): Observable<Booking> {
    const url = `${this.baseUrl}/bookFlight`;
    return this.http.post<Booking>(url, booking, this.getHttpOptions());
  }

  // Get Booking by Booking ID
  getBookingById(bookingId: number): Observable<Booking> {
    const url = `${this.baseUrl}/getByBookingId/${bookingId}`;
    return this.http.get<Booking>(url, this.getHttpOptions());
  }

  // Get Bookings by Flight ID
  getBookingsByFlightId(flightId: number): Observable<Booking[]> {
    const url = `${this.baseUrl}/getByFlightId/${flightId}`;
    return this.http.get<Booking[]>(url, this.getHttpOptions());
  }

  // Cancel Booking by Passenger ID
  cancelBooking(passengerId: number): Observable<Passenger> {
    const url = `${this.baseUrl}/deleteByPassengerId/${passengerId}`;
    return this.http.delete<Passenger>(url, this.getHttpOptions());
  }

}


