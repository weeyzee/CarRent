import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Booking } from '../../dto/booking.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-booking-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './booking-card.component.html',
  styleUrls: ['./booking-card.component.scss']
})
export class BookingCardComponent {
  @Input() booking!: Booking;
  @Output() deleteBooking = new EventEmitter<number>();

  onDelete(): void {
    if (this.booking.bookingId !== null) {
      this.deleteBooking.emit(this.booking.bookingId);
    }
  }
}
