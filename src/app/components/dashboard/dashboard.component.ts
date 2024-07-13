import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlightService } from '../flight/flight.service';
import { Flight } from '../flight/Flight';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgClass,FormsModule,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {

  flight:Flight;
  flightList:Array<Flight>=[];

  activeSection: string = 'addFlight';
  
  updateFlightId: number  = 0;

  deleteFlightId:number=0;

  deleteMessage:string='';

  updateMessage:string='';

  flightObj:Flight;

  updateFlightList:Array<Flight>=[];

  viewByFlightIdList:Array<Flight>=[];

  flightDetails: Array<Flight> = [];


  constructor(private authService: AuthService, private router: Router,private flightService :FlightService) {
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
  status = false;




  setActiveSection(section: string): void {
    this.activeSection = section;
  }
  




  addToggle() {
    this.status = !this.status;
  }

  clickHandler(event: Event) {
    event.preventDefault();
    console.log('clicked');
    this.authService.clearToken();
    this.router.navigateByUrl('/login');
    this;
  }

  ngOnInit(): void {
    this.flightService.getAllFlights().subscribe((data:Flight[])=>
    {
      this.flightList=data;
    })
  }

 addFlight(): void {
  console.log(this.flight)
    this.flightService.addFlight(this.flight).subscribe(
      (flight) => {
         // Reset the form after successful addition

      },
      (error) => {
        console.error('Error adding flight', error);
      }
    );
    alert("Flight Added successfully")
  }


  deleteFlight(): void {
    this.flightService.deleteFlight(this.deleteFlightId).subscribe(
      (message) => {
        console.log(message); // Handle success message
        // Optionally update flight list or perform other actions on success
      },
      (error) => {
       // this.deleteMessage = 'Error deleting flight. Please try again.';
        console.error('Error deleting flight:', error); // Handle error
        // Optionally show error message to the user
      }
    );

    this.deleteMessage="flight deleted successfully"
  }

  updateFlight(): void {
    this.flightService.viewByFlightId(this.updateFlightId).subscribe(
      (flight) => {
        this.flightObj= flight; // Get the flight object
        console.log(this.flightObj);
        console.log('Flight object retrieved:', this.flightObj);

        // Now update the flight object
        this.flightService.updateFlight(this.updateFlightId, this.flightObj).subscribe(
          (updatedFlight) => {
            console.log('Flight updated successfully:', updatedFlight); // Handle success message
            this.updateMessage = 'Flight updated successfully!';
            // Optionally update flight list or perform other actions on success
          },
          (error) => {
            //console.error('Error updating flight:', error); // Handle error
            this.updateMessage = 'Error updating flight. Please try again.';
            // Optionally show error message to the user
          }
        );
      },
      (error) => {
        console.error('Error retrieving flight:', error); // Handle error
        this.updateMessage = 'Error retrieving flight. Please try again.';
      }
    );
  }


}
