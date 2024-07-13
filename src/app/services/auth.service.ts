import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Flight } from '../components/flight/Flight';


@Injectable({
  providedIn: 'root',
})

//use session storage
export class AuthService {
  private readonly jwtTokenKey = 'jwtToken';
  constructor(private http:HttpClient) {}

  setToken(token: string): void {
    sessionStorage.setItem(this.jwtTokenKey, token);
  }

  getToken(): string | null {
    const token = sessionStorage.getItem(this.jwtTokenKey);
    if (token && this.isTokenExpired(token)) {
      this.clearToken();
      return null;
    }
    return token;
  }
  clearToken(): void {
    sessionStorage.removeItem(this.jwtTokenKey);
  }
  isTokenExpired(token: string): boolean {
    if (!token) {
      return true;
    }
    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    const expiry = new Date(tokenPayload.exp * 1000);
    return expiry <= new Date();
  }
  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role;
  }
  getUserName(): string  {
    const token = this.getToken();
    if (!token) {
      return '';
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.username;
  }
  getUserEmail(): string  {
    const token = this.getToken();
    if (!token) {
      return '';
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.email;
  }



  getAllFlights():Observable<Flight[]>{
    const url='http://localhost:8086/flight';
    const tkn = this.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + tkn,
      }),
    };
    return this.http.get<Array<Flight>>(url+'/viewAll',httpOptions);
  }
}
