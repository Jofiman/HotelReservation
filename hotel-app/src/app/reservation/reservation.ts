import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {

  private apiUrl = 'http://localhost:3000';

  private reservations: Reservation[] = [];

  constructor(private http: HttpClient) {

  }

  // crud operations

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.apiUrl + '/reservations');
  }

  getReservation(id: string): Observable<Reservation | undefined> {
    return this.http.get<Reservation>(this.apiUrl + '/reservation/' + id);
  }

  addReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(this.apiUrl + '/reservation', reservation);
  }

  deleteReservation(id: string): Observable<void> {
    console.log("Deleting from API:", this.apiUrl + '/reservation/' + id);
    return this.http.delete<void>(this.apiUrl + '/reservation/' + id);
  }

  updateReservation(id: string, updateReservation: Reservation): Observable<Reservation> {
    return this.http.put<Reservation>(this.apiUrl + '/reservation/' + id, updateReservation);
  }
}

