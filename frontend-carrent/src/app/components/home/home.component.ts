import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { BookingService } from '../../services/booking.service';
import { CarService } from '../../services/car.service';
import { Car } from '../../dto/car.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  form!: FormGroup;
  cars: Car[] = [];
  selectedCarId: number | null = null;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private carService: CarService,
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      userId: [''],
      startTime: ['']
    });

    this.carService.getCars().subscribe(cars => {
      this.cars = cars;
    });
  }

  selectCar(carId: number) {
    this.selectedCarId = carId;
  }

  submitBooking() {
    if (!this.selectedCarId || !this.form.valid) return;

    const bookingData = {
      ...this.form.value,
      carId: this.selectedCarId,
      status: 'ACTIVE'
    };

    console.log('Данные для бронирования:', bookingData);
    this.bookingService.createBooking(bookingData).subscribe({
      next: (res) => {
        console.log('Бронирование успешно:', res);
        alert('Бронирование создано!');
        const bookingId = res.bookingId;
        // Навигация с передачей bookingId в маршрут
        this.router.navigate(['/trip-form', bookingId]);
      },
      error: (err) => {
        console.error('Ошибка:', err);
      }
    });
  }
}
