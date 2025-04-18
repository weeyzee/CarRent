import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarMileageService } from '../../services/car-mileage.service';  // Импортируем сервис
import { CarMileage } from '../../dto/car-mileage.model';  // Импортируем модель
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';  // Импортируем CommonModule

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.scss'],
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatPaginatorModule, MatSortModule, CommonModule],  // Импортируем необходимые модули
})
export class CarDetailComponent implements OnInit {
  @Input() carId!: number;  // Получаем ID машины из родительского компонента или маршрута
  carMileage: CarMileage[] = [];
  displayedColumns: string[] = ['timeStamp', 'mileage'];  // Заголовки таблицы
  dataSource = new MatTableDataSource<CarMileage>();

  constructor(
    private carMileageService: CarMileageService, // Используем сервис
    private route: ActivatedRoute // Для получения параметров маршрута
  ) {}

  ngOnInit(): void {
    // Получаем ID машины из параметров маршрута
    this.route.paramMap.subscribe(params => {
      this.carId = +params.get('carId')!;  // Преобразуем carId в число
      this.loadCarMileage();  // Загружаем пробег для выбранной машины
    });
  }

  // Метод для загрузки пробега
  loadCarMileage(): void {
    this.carMileageService.getCarMileageByCarId(this.carId).subscribe(
      (data) => {
        console.log('Пробег получен:', data);  // <-- проверь в консоли
        this.dataSource.data = [data];
        console.log(Array.isArray(data), data);

      },
      (error) => {
        console.error('Ошибка загрузки пробега:', error);
      }
    );
  }
  

}
