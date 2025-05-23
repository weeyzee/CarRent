import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { Car } from '../../dto/car.model';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-car-card',
  imports: [
    CommonModule, 
    MatButtonModule, 
    MatCardModule, 
    RouterModule, 
    MatIcon
  ],
  templateUrl: './car-card.component.html',
  styleUrls: ['./car-card.component.scss']
})
export class CarCardComponent {
  @Input() car!: Car;
  @Output() deleteCar = new EventEmitter<number>();

  constructor(private router: Router, private carService: CarService) {}

  viewDetails(car: Car) {
    this.router.navigate(['/cars', car.carId]);
  }

  // onDelete() {
  //   if (this.car.carId) {
  //     this.deleteCar.emit(this.car.carId);
  //   }
  // }

  delCar(carId: number): void {
    if (confirm('Вы уверены, что хотите удалить машину? C ID: ' + carId)) {
      this.carService.deleteCar(carId).subscribe({
        next: () => {
          console.log('Машин удалён!""!');
        },
        error: err => console.error('Ошибка удаления пользователя:', err)
      });
    }
  }
}
