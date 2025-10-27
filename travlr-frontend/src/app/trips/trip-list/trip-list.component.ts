import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripDataService } from '../trip-data';
import { Trip } from '../trip.model';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [CommonModule, TripCardComponent, RouterModule],
  templateUrl: './trip-list.html'
})
export class TripListComponent implements OnInit {
  trips: Trip[] = [];
  loading = true;
  error?: string;

  constructor(private tripsSvc: TripDataService) {}

  ngOnInit(): void {
    this.tripsSvc.getTrips().subscribe({
      next: (t) => {
        this.trips = t;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load trips';
        this.loading = false;
      }
    });
  }
}
