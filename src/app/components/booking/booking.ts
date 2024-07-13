import { Passenger } from "../passenger/passenger";

export interface Booking{

    bookingId:any|number;
    flightId: number;
    userEmailId:string;
    bookingStatus:boolean;
    noOfPersons:number;
    bookingDate: string;
    totalCost:number;
    seatNumbers:Array<String>;
    passengerList: Array<Passenger>;
}