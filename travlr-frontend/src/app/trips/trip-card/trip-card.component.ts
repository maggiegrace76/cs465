import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Trip } from '../trip.model';
import { TripDataService } from '../trip-data';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule, RouterModule],   // <-- add RouterModule
  templateUrl: './trip-card.html'
})
export class TripCardComponent {
  @Input() trip!: Trip;
  deleting = false;

  constructor(private svc: TripDataService) {}

  remove() {
    if (!confirm(`Delete ${this.trip.name}?`)) return;
    this.deleting = true;
    this.svc.deleteTrip(this.trip.code).subscribe({
      next: () => location.reload(),
      error: () => (this.deleting = false)
    });
  }
}
