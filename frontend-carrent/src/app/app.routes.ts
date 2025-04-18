import { Routes } from '@angular/router';

import { CarListComponent } from './components/car-list/car-list.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { BookingComponent } from './components/booking/booking.component';
import { TripComponent } from './components/trip/trip.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { PaymentComponent } from './components/payment/payment.component';
import { HomeComponent } from './components/home/home.component'; 

export const routes: Routes = [
  // Список автомобилей
  { path: 'cars', component: CarListComponent },

  // Детали автомобиля по идентификатору carId
  { path: 'cars/:carId', component: CarDetailComponent },

  // Создание бронирования
  { path: 'booking', component: BookingComponent },

  // Путешествия (поездки)
  { path: 'trips', component: TripComponent },

  { path: 'trip-form/:bookingId', component: TripComponent },

  // Профиль пользователя
  { path: 'profile', component: UserProfileComponent },

  // Оплата
  { path: 'payment/:tripId', component: PaymentComponent },

  // Домашняя страница
  { path: '', component: HomeComponent, pathMatch: 'full' },
  // С неизвестных редирект на домашнюю страницу
  { path: '**', redirectTo: '' }
];
