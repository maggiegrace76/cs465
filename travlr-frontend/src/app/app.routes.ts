import { Routes } from '@angular/router';
import { TripListComponent } from './trips/trip-list/trip-list';
import { TripAddComponent } from './trips/trip-add/trip-add';
import { TripEditComponent } from './trips/trip-edit/trip-edit';

export const routes: Routes = [
  { path: '', redirectTo: 'trips', pathMatch: 'full' },
  { path: 'trips', component: TripListComponent },
  { path: 'trips/add', component: TripAddComponent },
  { path: 'trips/:code/edit', component: TripEditComponent },
];
