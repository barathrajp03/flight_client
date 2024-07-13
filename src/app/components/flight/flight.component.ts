import { Component, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Flight } from './Flight';
import { FlightService } from './flight.service';
import { Router, RouterLink } from '@angular/router';
import { DatatransferService } from '../../services/datatransfer.service';


@Component({
  selector: 'app-flight',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './flight.component.html',
  styleUrl: './flight.component.css'
})
export class FlightComponent implements OnInit{
[x: string]: any;
  flight:Flight;
  searchFlightName:string='';
  source:string='';
  destination:string='';
  flightList:Array<Flight>=[];
  flightNameList:Array<Flight>=[];
  searchFlightId=0;
  searchSource:string='';
  searchDestination:string='';
  searchDate:string='';
  searchBySourceAndDestinationAndDateList:Array<Flight>=[];
  flightIdObj:Flight | undefined;


  



  constructor(private flightService:FlightService, private router :Router,private dataTransferService: DatatransferService){
    this.flight={
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
  ngOnInit(): void {
    this.flightService.getAllFlights().subscribe((data:Flight[])=>
    {
      this.flightList=data;
    })
  }

//  addFlight(): void {
//   console.log(this.flight)
//     this.flightService.addFlight(this.flight).subscribe(
//       (flight) => {
//          // Reset the form after successful addition
//       },
//       (error) => {
//         console.error('Error adding flight', error);
//       }
//     );
//   }

  searchFlight(): void {

    console.log('barath 1')
    if (this.searchFlightName) {
      this.flightService.viewByFlightName(this.searchFlightName).subscribe(
        (flights) => {
          this.flightNameList = flights;
          console.log(this.flightNameList)
        },
        (error) => {
          console.error('Error searching flight', error);
        }
      );
     
    }
  }
  


  clicked(){
    //this.router.navigateByUrl("/booking")
  }

  searchByFlightId(): void {

    console.log(this.searchFlightId)
    if (this.searchFlightId) {
      this.flightService.viewByFlightId(this.searchFlightId).subscribe(
        (data: Flight) => {
          this.flightIdObj = data;
        },
        (error) => {
          console.error('Error fetching flights by ID', error);
        }
      );
    }
  }

  searchBySourceAndDestinationAndDate(): void {
    if (this.searchSource && this.searchDestination && this.searchDate) {
      this.flightService.searchBySourceAndDestinationAndDate(this.searchSource, this.searchDestination, this.searchDate ).subscribe(
        (data: Flight[]) => {
          this.searchBySourceAndDestinationAndDateList = data;
        },
        (error) => {
          console.error('Error fetching flights by source, destination, and date', error);
        }
      );
    }
  }

  bookFlight(flight: Flight): void {


    console.log(flight)
    this.dataTransferService.setFlight(flight);
    this.router.navigate(['/booking']);
  }

}
