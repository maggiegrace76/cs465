import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TripDataService } from '../trip-data';

@Component({
  selector: 'app-trip-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './trip-add.html'
})
export class TripAddComponent {
  form: FormGroup;
  saving = false;
  error?: string;

  constructor(private fb: FormBuilder, private svc: TripDataService, private router: Router) {
    this.form = this.fb.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: [1, [Validators.required, Validators.min(1)]],
      start: ['', Validators.required],
      resort: [''],
      perPerson: [0, [Validators.required, Validators.min(0)]],
      image: [''],
      description: ['']
    });
  }

  save() {
    if (this.form.invalid) return;
    this.saving = true;

    const v = this.form.value as any;

    // Coerce types so they match the backend schema
    const body = {
      ...v,
      length: Number(v.length),        // if your schema expects number; if it expects "X days", use String(v.length)
      perPerson: Number(v.perPerson),
      start: v.start ? new Date(v.start).toISOString() : undefined
    };

    this.svc.addTrip(body as any).subscribe({
      next: () => this.router.navigate(['/trips']),
      error: (err) => {
        this.error = err?.error?.message || err?.statusText || 'Failed to add trip';
        this.saving = false;
      }
    });
  }
}

