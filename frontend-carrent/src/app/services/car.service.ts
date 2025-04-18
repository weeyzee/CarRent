import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments';
import { Observable } from 'rxjs';
import { Car } from '../dto/car.model';  // предполагается, что у вас есть модель Car

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiUrl = `${environment.apiUrl}/cars`;

  constructor(private http: HttpClient) { }

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.apiUrl);
  }

  getCarById(carId: number): Observable<Car> {
    return this.http.get<Car>(`${this.apiUrl}/${carId}`);
  }

  createCar(car: Car): Observable<Car> {
    return this.http.post<Car>(this.apiUrl, car);
  }

  getAvailableCarByBrand(brand: string): Observable<Car> {
    return this.http.get<Car>(`${this.apiUrl}/cars/available?brand=${brand}`);
  }

  getAvailableBrands(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/brands`);
  }

  updateCar(carId: number, car: Car): Observable<Car> {
    return this.http.put<Car>(`${this.apiUrl}/${carId}`, car);
  }

  deleteCar(carId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${carId}`);
  }
}
