import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TripDataService } from '../trip-data';

@Component({
  selector: 'app-trip-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './trip-edit.html'
})
export class TripEditComponent implements OnInit {
  code!: string;
  form: FormGroup;
  loading = true;
  saving = false;
  error?: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private svc: TripDataService,
    private router: Router
  ) {
    // build the form in the constructor so fb is already initialized
    this.form = this.fb.group({
      name: ['', Validators.required],
      length: [1, [Validators.required, Validators.min(1)]],
      start: ['', Validators.required],
      resort: [''],
      perPerson: [0, [Validators.required, Validators.min(0)]],
      image: [''],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.code = this.route.snapshot.paramMap.get('code')!;
    this.svc.getTripByCode(this.code).subscribe({
      next: t => {
        // patch the form with existing trip values
        this.form.patchValue(t as any);
        this.loading = false;
      },
      error: () => {
        this.error = 'Trip not found';
        this.loading = false;
      }
    });
  }

  save() {
    if (this.form.invalid) return;
    this.saving = true;
    const body = this.form.value as any; // avoid strict null type mismatch
    this.svc.updateTrip(this.code, body).subscribe({
      next: () => this.router.navigate(['/trips']),
      error: () => { this.error = 'Failed to update trip'; this.saving = false; }
    });
  }
}
