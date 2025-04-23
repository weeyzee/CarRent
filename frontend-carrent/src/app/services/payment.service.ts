import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments';
import { Observable } from 'rxjs';
import { Payment } from '../dto/payment.model';  // предполагается, что у вас есть модель Payment

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = `${environment.apiUrl}/payments`;

  constructor(private http: HttpClient) { }

  getPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(this.apiUrl);
  }

  getPaymentById(paymentId: number): Observable<Payment> {
    return this.http.get<Payment>(`${this.apiUrl}/${paymentId}`);
  }

  // createPayment(payment: Payment): Observable<Payment> {
  //   return this.http.post<Payment>(this.apiUrl, payment);
  // }
  createPayment(payment: Payment) {
    const token = localStorage.getItem('token'); // или sessionStorage
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });

    return this.http.post(this.apiUrl, payment, { headers });
  }
  updatePayment(paymentId: number, payment: Payment): Observable<Payment> {
    return this.http.put<Payment>(`${this.apiUrl}/${paymentId}`, payment);
  }

  deletePayment(paymentId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${paymentId}`);
  }
}
