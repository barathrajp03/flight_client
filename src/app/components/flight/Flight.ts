export interface Flight{

     flightId: number;
     flightName:string;
	 totalSeats:number;
     source:string;
     destination:string;
	 date:string;
     price:number;	
     departure:string;	
     arrival: string;
	 seatNumbers:Array<string>;
	 avilableSeats:number;

}