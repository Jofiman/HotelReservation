import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation';
import { Reservation } from '../models/reservation';
import { Router, ActivatedRoute } from '@angular/router';
import { Home } from '../home/home';

@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, Home],
  templateUrl: './reservation-form.html',
  styleUrl: './reservation-form.scss',
})
export class ReservationForm implements OnInit {
  reservationForm: FormGroup = new FormGroup({});
  private formBuilder = inject(FormBuilder);
  private reservationService = inject(ReservationService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    this.reservationForm = this.formBuilder.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      roomNumber: ['', [Validators.required, Validators.min(1)]],
    });

    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id) {
      this.reservationService.getReservation(id).subscribe(reservation => {
        if(reservation) {
          this.reservationForm.patchValue(reservation);
        }
      });
      
    }
  }

  onSubmit() {
    if (this.reservationForm.valid) {
      let reservation : Reservation = this.reservationForm.value

      let id = this.activatedRoute.snapshot.paramMap.get('id');
      if(id) {
        // update existing reservation
        reservation.id = id;
        this.reservationService.updateReservation(id, reservation).subscribe(() => {
          console.log("Updated");
          this.router.navigate(['/list']);
        });
      } else {
        this.reservationService.addReservation(reservation).subscribe(() => {
          console.log("Created");
          this.router.navigate(['/list']);
        });
      }
    }
  }
}
