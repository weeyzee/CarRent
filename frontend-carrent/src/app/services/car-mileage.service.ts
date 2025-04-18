import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments';
import { Observable } from 'rxjs';
import { CarMileage } from '../dto/car-mileage.model';  // предполагается, что у вас есть модель CarMileage

@Injectable({
  providedIn: 'root'
})
export class CarMileageService {
  private apiUrl = `${environment.apiUrl}/mileage`;

  constructor(private http: HttpClient) { }

  getCarMileage(): Observable<CarMileage[]> {
    return this.http.get<CarMileage[]>(this.apiUrl);
  }

  getCarMileageByCarId(carId: number): Observable<CarMileage> {
    return this.http.get<CarMileage>(`${this.apiUrl}/car/${carId}`);
  }

  createCarMileage(carMileage: CarMileage): Observable<CarMileage> {
    return this.http.post<CarMileage>(this.apiUrl, carMileage);
  }

  updateCarMileage(mileageId: number, carMileage: CarMileage): Observable<CarMileage> {
    return this.http.put<CarMileage>(`${this.apiUrl}/${mileageId}`, carMileage);
  }

  deleteCarMileage(mileageId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${mileageId}`);
  }
}