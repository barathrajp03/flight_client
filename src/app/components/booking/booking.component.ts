import { Component, OnInit } from '@angular/core';
import { Booking } from './booking';
import { Flight } from '../flight/Flight';
import { DatatransferService } from '../../services/datatransfer.service';
import { BookingService } from './booking.service';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnInit {
  flight: Flight;
  booking!: Booking;
  seats: { number: string, selected: boolean, booked: boolean }[] = [];
  bookedSeats: string[] = []; // Add bookedSeats array

  constructor(
    private dataTransferService: DatatransferService, 
    private bookingService: BookingService, 
    private authService: AuthService,
    private router: Router
  ) {
    this.flight = this.dataTransferService.getFlight();
  }

  ngOnInit(): void {
    this.booking = {
      bookingId: '',
      flightId: this.flight.flightId,
      userEmailId: this.authService.getUserEmail(),
      bookingStatus: false,
      noOfPersons: 0,
      bookingDate: '',
      totalCost: 0,
      seatNumbers: [],
      passengerList: []
    };
    this.loadBookedSeats(); // Load booked seats when component initializes
    this.generateSeats();
  }

  loadBookedSeats() {
    // Mock data for booked seats; replace this with actual service call
    this.bookedSeats = [];
  }

  // generateSeats() {
  //   for (let i = 1; i <= this.flight.totalSeats; i++) {
  //     const seatNumber = `A${i}`;
  //     this.seats.push({
  //       number: seatNumber,
  //       selected: false,
  //       booked: this.bookedSeats.includes(seatNumber)
  //     });
  //   }
  // }


  generateSeats() {
    for (let i = 101; i < 101 + this.flight.totalSeats; i++) {
      const seatNumber = `A${i}`;
      this.seats.push({
        number: seatNumber,
        selected: false,
        booked: this.bookedSeats.includes(seatNumber)
      });
    }
  }

  toggleSeatSelection(seat: any) {
    if (!seat.booked) {
      seat.selected = !seat.selected;
      this.updateSeatNumbers();
    }
  }

  updateSeatNumbers() {
    const selectedSeats = this.seats.filter(seat => seat.selected).map(seat => seat.number);
    this.booking.seatNumbers = selectedSeats;
    this.calculateTotalCost();
  }

  calculateTotalCost() {
    this.booking.totalCost = this.booking.seatNumbers.length * this.flight.price;
  }  

  updatePassengerList(): void {
    const currentCount = this.booking.passengerList.length;
    if (this.booking.noOfPersons > currentCount) {
      for (let i = currentCount; i < this.booking.noOfPersons; i++) {
        this.booking.passengerList.push({
          firstName: '',
          lastName: '',
          age: '',
          gender: '',
          mailId: '',
          phoneNumber: '',
          passportNumber: '',
          seatName: '',
          bookingId: 0
        });
      }
    } else if (this.booking.noOfPersons < currentCount) {
      this.booking.passengerList.splice(this.booking.noOfPersons);
    }
  }

  bookFlight(): void {
    this.bookingService.bookFlight(this.booking).subscribe(
      (booking) => {
        console.log('Booking successful:', booking);
      },
      (error) => {
        console.error('Error booking flight:', error);
      }
    );
    console.log(this.booking)
  }
}
