import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';  // Импортируем CommonModule
import { MatIcon } from '@angular/material/icon';
import { Car } from '../../dto/car.model';  // Импортируем модель Car
import { CarService } from '../../services/car.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { CarCardComponent } from '../car-card/car-card.component';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [
    MatButtonModule, 
    RouterLink, 
    RouterModule, 
    CommonModule,
    MatIcon,
    ReactiveFormsModule, 
    CarCardComponent,
    MatFormField, 
    MatLabel, 
    MatFormFieldModule, 
    MatInputModule,
  ],
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent implements OnInit {
  cars: Car[] = [];
  searchControl = new FormControl('');

  constructor(
    private carService: CarService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadCars();
  }

  loadCars(search?: string): void {
    this.carService.getCars().subscribe(cars => {
      this.cars = cars;
    });
  }

  searchCars(): void {
    const searchQuery = this.searchControl.value?.trim();
    this.loadCars(searchQuery);
  }

  onSearchKeyDown(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    if (keyboardEvent.key === 'Enter') {
      this.searchCars();
    }
  }

  onDeleteCar(carId: number) {
    this.carService.deleteCar(carId).subscribe({
      next: () => {
        this.cars = this.cars.filter(car => car.carId !== carId);
      },
      error: (err) => console.error('Ошибка удаления автомобиля:', err)
    });
  }
}
