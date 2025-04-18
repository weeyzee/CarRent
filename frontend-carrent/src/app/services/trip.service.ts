import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments';
import { Observable } from 'rxjs';
import { Trip } from '../dto/trip.model';  // предполагается, что у вас есть модель Trip

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private apiUrl = `${environment.apiUrl}/trips`;

  constructor(private http: HttpClient) { }

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.apiUrl);
  }

  getTripById(tripId: number): Observable<Trip> {
    return this.http.get<Trip>(`${this.apiUrl}/${tripId}`);
  }

  createTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.apiUrl, trip);
  }

  completeTrip(tripId: number, endLocation: string): Observable<Trip> {
    return this.http.put<Trip>(`${this.apiUrl}/${tripId}`, {
      completed: true,
      endLocation
    });
  }
  
  updateTrip(tripId: number, trip: Trip): Observable<Trip> {
    return this.http.put<Trip>(`${this.apiUrl}/${tripId}`, trip);
  }

  deleteTrip(tripId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${tripId}`);
  }
}
