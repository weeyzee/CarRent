import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments';
import { Observable } from 'rxjs';
import { User } from '../dto/user.model';  // предполагается, что у вас есть модель User

export interface UserDto {
  userId: number;
  name: string;
  email: string;
  phoneNumber: string;
  licenseNum: string;
  registrationDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(`${this.apiUrl}/users`);
  }

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${userId}`);
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/email/${email}`);
  }
  
  getTripsByUserId(userId: number) {
    return this.http.get<any[]>(`${this.apiUrl}/trips/user/${userId}`);
  }

  loginUser(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, { email, password });
  }
  
  createUser(user: any): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/auth/register`, user);
  }

  // updateUser(userId: number, user: User): Observable<User> {
  //   return this.http.put<User>(`${this.apiUrl}/users/${userId}`, user);
  // }

  updateUser(userId: number, user: Partial<UserDto>): Observable<UserDto> {
    return this.http.put<UserDto>(`${this.apiUrl}/users/${userId}`, user);
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${userId}`);
  }
}
