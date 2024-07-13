import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Passenger } from './passenger';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PassengerService {

  private baseUrl = 'http://localhost:8086/passenger';

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

  // Add Passengers by Booking ID
  addPassengersByBookingId(passengersList: Passenger[], bookingId: number): Observable<Passenger[]> {
    const url = `${this.baseUrl}/add/${bookingId}`;
    return this.http.post<Passenger[]>(url, passengersList, this.getHttpOptions());
  }

  // Get Passengers List by Booking ID
  getPassengersListByBookingId(bookingId: number): Observable<Passenger[]> {
    const url = `${this.baseUrl}/get/${bookingId}`;
    return this.http.get<Passenger[]>(url, this.getHttpOptions());
  }

  // Get Passenger by Passenger ID
  getPassengerByPassengerId(passengerId: number): Observable<Passenger> {
    const url = `${this.baseUrl}/getByPassengerId/${passengerId}`;
    return this.http.get<Passenger>(url, this.getHttpOptions());
  }

  // Delete Passenger by Passenger ID
  deletePassenger(passengerId: number): Observable<Passenger> {
    const url = `${this.baseUrl}/delete/${passengerId}`;
    return this.http.delete<Passenger>(url, this.getHttpOptions());
  }
}
