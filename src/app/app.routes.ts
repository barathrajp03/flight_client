import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { WildCardRedirectsComponent } from './components/wild-card-redirects/wild-card-redirects.component';
import { PlaygroundComponent } from './components/playground/playground.component';
import { RegisterComponent } from './components/register/register.component';
import { FlightComponent } from './components/flight/flight.component';
import { HomeComponent } from './components/home/home.component';
import { BookingComponent } from './components/booking/booking.component';

export const routes: Routes = [
  //{ path: '', redirectTo: 'flight', pathMatch: 'full' },
  {path:"",component:HomeComponent},
  {path:"flight",component:FlightComponent},
  {path:"booking",component:BookingComponent},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  // { path: 'playground', component: PlaygroundComponent },
 
  
  //  { path: '**', component: WildCardRedirectsComponent }
];
