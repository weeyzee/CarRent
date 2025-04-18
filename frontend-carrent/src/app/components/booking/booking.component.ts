import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { Booking } from '../../dto/booking.model';  // Импортируем модель Booking
import { BookingService } from '../../services/booking.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BookingCardComponent } from '../booking-card/booking-card.component';


@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    MatButtonModule, 
    RouterLink, 
    RouterModule, 
    BookingCardComponent,
    CommonModule,
    MatIcon,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  bookings: Booking[] = [];
  searchControl = new FormControl('');

  constructor(
    private bookingService: BookingService
  ) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(search?: string): void {
    this.bookingService.getBookings().subscribe(bookings => {
      this.bookings = bookings;
    });
  }

  searchBookings(): void {
    const searchQuery = this.searchControl.value?.trim();
    this.loadBookings(searchQuery);
  }

  onSearchKeyDown(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    if (keyboardEvent.key === 'Enter') {
      this.searchBookings();
    }
  }

  onDeleteBooking(bookingId: number) {
    this.bookingService.deleteBooking(bookingId).subscribe({
      next: () => {
        this.bookings = this.bookings.filter(booking => booking.carId !== bookingId);
      },
      error: (err) => console.error('Ошибка удаления бронирования:', err)
    });
  }
}
