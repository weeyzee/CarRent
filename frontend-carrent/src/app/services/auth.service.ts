// filepath: d:\FourthCourse\CarRent\frontend-carrent\src\app\services\auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getToken(): string | null {
    return localStorage.getItem('token'); // Получаем токен из localStorage
  }
}