import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TripService } from '../../services/trip.service'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  
import { PaymentService } from '../../services/payment.service';
import { Payment } from '../../dto/payment.model'; // Импортируем Payment

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  imports: [
    FormsModule,
    CommonModule  
  ]
})
export class PaymentComponent implements OnInit {
  tripId!: number;
  trip: any;
  paymentMethod: string = 'cash';
  currentDate: Date = new Date();

  constructor(
    private route: ActivatedRoute,
    private tripService: TripService,
    private paymentService: PaymentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tripId = +this.route.snapshot.paramMap.get('tripId')!;
    this.tripService.getTripById(this.tripId).subscribe((data) => {
      this.trip = data;
    });
  }

  completePayment() {
    const payment: Payment = {
      paymentId: 0,  // Здесь предполагаем, что ID создастся на сервере
      tripId: this.tripId,
      amount: this.trip.price,
      paymentMethod: this.paymentMethod,
      paymentDate: this.currentDate
    };

    this.paymentService.createPayment(payment).subscribe({
      next: (response) => {
        console.log('Оплата выполнена');
        console.log('Сумма:', this.trip.price);
        console.log('Способ оплаты:', this.paymentMethod);
        console.log('Дата оплаты:', this.currentDate);
        this.router.navigate(['/']);  // Перенаправление на главную страницу после оплаты
      },
      error: (err) => {
        console.error('Ошибка при выполнении платежа', err);
      }
    });
  }
}
