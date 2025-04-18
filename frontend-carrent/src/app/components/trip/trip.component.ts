// src/app/trip/trip.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripService } from '../../services/trip.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Trip } from '../../dto/trip.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-trip',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule],
  templateUrl: './trip.component.html',
  styleUrl: './trip.component.css'
})
export class TripComponent {
  bookingId: number = 0;
  trip?: Trip;
  message = '';

  constructor(
    private tripService: TripService,
    private router: Router,
    private route: ActivatedRoute  ) 
  {}

  ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        this.bookingId = +params.get('bookingId')!; // Преобразуем строку в число
        console.log('Получен bookingId:', this.bookingId);
      });
  }

  generateLocation(): string {
    const lat = (Math.random() * 180 - 90).toFixed(6);
    const lng = (Math.random() * 360 - 180).toFixed(6);
    return `${lat}, ${lng}`;
  }

  generateDistance(): number {
    return parseFloat((Math.random() * 10 + 1).toFixed(2));
  }

  startTrip() {
    const trip: Trip = {
      bookingId: this.bookingId,
      distance: this.generateDistance(),
      price: 30.0,
      completed: false,
      startLocation: this.generateLocation(),
      endLocation: "not finished",
    };
    console.log(trip)
    this.tripService.createTrip(trip).subscribe({
      next: t => {
        this.trip = t;
        this.message = 'Поездка начата';
      },
      error: err => {
        console.error(err);
        this.message = 'Ошибка при старте поездки';
      }
    });
  }

  completeTrip() {
    if (!this.trip) return;
    const endLocation = this.generateLocation();
    this.tripService.completeTrip(this.trip.tripId!, endLocation).subscribe({
      next: updated => {
        this.trip = updated;
        this.message = 'Поездка завершена';
      },
      error: err => {
        console.error(err);
        this.message = 'Ошибка при завершении поездки';
      }
    });
  }

  goToPayment() {
    if (this.trip) {
      this.router.navigate(['/payment', this.trip.tripId]);  // Переход на страницу оплаты
    }
  }
  
}
