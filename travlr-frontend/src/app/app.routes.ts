import { Routes as AngularRoutes } from '@angular/router';
import { LoginComponent } from './login/login'; // your file is login.ts
import { TripListComponent } from './trips/trip-list/trip-list.component';
import { TripAddComponent } from './trips/trip-add/trip-add.component';
import { TripEditComponent } from './trips/trip-edit/trip-edit.component';
import { AuthGuard } from './guards/auth-guard';

export const appRoutes: AngularRoutes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'trips', component: TripListComponent, canActivate: [AuthGuard] },
  { path: 'trips/add', component: TripAddComponent, canActivate: [AuthGuard] },
  { path: 'trips/:code/edit', component: TripEditComponent, canActivate: [AuthGuard] }
];
