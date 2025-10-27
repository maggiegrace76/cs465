import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from './trip.model';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {
  private baseUrl = '/api/trips'; // uses proxy.conf.json to hit Express backend

  constructor(private http: HttpClient) {}

  // GET all trips
  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.baseUrl);
  }

  // GET one trip by code
  getTripByCode(code: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.baseUrl}/${code}`);
  }

  // POST (add new trip)
  addTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.baseUrl, trip);
  }

  // PUT (update existing trip)
  updateTrip(code: string, trip: Partial<Trip>): Observable<Trip> {
    return this.http.put<Trip>(`${this.baseUrl}/${code}`, trip);
  }

  // DELETE (remove trip)
  deleteTrip(code: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/${code}`);
  }
}
