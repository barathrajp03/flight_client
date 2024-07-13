import { Injectable } from '@angular/core';
import { Flight } from './Flight';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  constructor(private authService:AuthService, private http : HttpClient) { }

  getAllFlights():Observable<Flight[]>{
    const url='http://localhost:8086/flight';
    const tkn = this.authService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + tkn,
      }),
    };
    return this.http.get<Array<Flight>>(url+'/viewAll',httpOptions);
  }

  addFlight(flightObj: Flight){
    const url='http://localhost:8086/flightAdmin';
    const tkn = this.authService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + tkn,
      }),
    };
    return this.http.post<Array<Flight>>(url+'/add',flightObj ,httpOptions);
  }
  viewByFlightName(flightName:string):Observable<Flight[]>{

    console.log("Barath 2")
    console.log(flightName)
    const url='http://localhost:8086/flight';
    const tkn = this.authService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + tkn,
      }),
    };
    return this.http.get<Array<Flight>>(url+'/viewByFlightName/'+flightName,httpOptions);
  }
  viewByFlightId(flightId:number):Observable<Flight>{

    console.log(flightId)
    const url='http://localhost:8086/flight';
    const tkn = this.authService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + tkn,
      }),
    };
    return this.http.get<Flight>(url+'/viewByFlightId/'+flightId,httpOptions);
  }
  searchBySourceAndDestinationAndDate(source:string,destination:string,date:string):Observable<Flight[]>{
    const url='http://localhost:8086/flight';
    const tkn = this.authService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + tkn,
      }),
    };
    console.log(date);
    return this.http.get<Array<Flight>>(url+'/search/'+source+'/'+destination+'/'+date,httpOptions);
  }
  
  deleteFlight(flightId:number):Observable<string>{

    console.log(flightId)
    const url='http://localhost:8086/flightAdmin';
    const tkn = this.authService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + tkn,
      }),
    };
    return this.http.delete<string>(url+'/delete/'+flightId,httpOptions);
  }


   
  updateFlight(flightId:number,flightObj:Flight):Observable<Flight>{

    console.log(flightId)
    const url='http://localhost:8086/flightAdmin';
    const tkn = this.authService.getToken();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + tkn,
      }),
    };
    return this.http.put<Flight>(url+'/updateFlightByFlightId/'+flightId,httpOptions);
  }


  

}
