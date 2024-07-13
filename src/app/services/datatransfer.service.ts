import { Injectable } from '@angular/core';
import { Flight } from '../components/flight/Flight';

@Injectable({
  providedIn: 'root'
})
export class DatatransferService {

  flightObj:Flight;
  constructor() { 
    this.flightObj={
      flightId: 0,
      flightName:'',
    totalSeats:0,
      source:'',
      destination:'',
    date:'',
      price:0,
      departure:'',
      arrival: '',
    seatNumbers:[],
    avilableSeats:0
    }
  }



  setFlight(flight: Flight) {
    this.flightObj = flight;
  }
  getFlight(): Flight {
    return this.flightObj;
  }
}
