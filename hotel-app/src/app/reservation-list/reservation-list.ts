import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationService } from '../reservation/reservation';
import { Reservation } from '../models/reservation';
import { RouterLink } from "@angular/router";
import { Home } from '../home/home';

@Component({
  selector: 'app-reservation-list',
  standalone: true,
  imports: [CommonModule, RouterLink, Home],
  templateUrl: './reservation-list.html',
  styleUrl: './reservation-list.scss',
})
export class ReservationList implements OnInit {
  reservations: Reservation[] = [];

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
      this.loadReservations();
  }

  loadReservations(): void {
    console.log("Loading reservations from API...");
    this.reservationService.getReservations().subscribe({
      next: (reservations) => {
        console.log("Reservations loaded:", reservations);
        this.reservations = reservations;
      },
      error: (err) => {
        console.error("Error loading reservations:", err);
      }
    });
  }

  deleteReservation(id: string) {
    console.log("Attempting to delete reservation with id:", id);
    if (!id) {
      console.error("No ID provided for deletion");
      return;
    }
    this.reservationService.deleteReservation(id).subscribe({
      next: () => {
        console.log("Deleted successfully");
        this.loadReservations();
      },
      error: (err) => {
        console.error("Error deleting reservation:", err);
      }
    });
  }
}
