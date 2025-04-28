import { Routes } from '@angular/router';

import { CarListComponent } from './components/car-list/car-list.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { BookingComponent } from './components/booking/booking.component';
import { TripComponent } from './components/trip/trip.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { PaymentComponent } from './components/payment/payment.component';
import { HomeComponent } from './components/home/home.component'; 
import { AdminUserManagementComponent } from './components/admin-user-management/admin-user-management.component';
import { CarCardComponent } from './components/car-card/car-card.component';

export const routes: Routes = [
  
  { path: 'cars', component: CarListComponent },

  { path: 'cars/:carId', component: CarDetailComponent },

  { path: 'booking', component: BookingComponent },

  { path: 'trips', component: TripComponent },

  { path: 'trip-form/:bookingId', component: TripComponent },

  { path: 'payment/:tripId', component: PaymentComponent },

  { path: 'user-profile', component: UserProfileComponent },

  { path: 'admin', component: AdminUserManagementComponent },

  { path: '', component: HomeComponent, pathMatch: 'full' },

  { path: '**', redirectTo: '' }
];
