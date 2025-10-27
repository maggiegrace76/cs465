import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';      // <-- for *ngIf
import { FormsModule } from '@angular/forms';        // <-- for [(ngModel)]
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,                      // <-- standalone component
  imports: [CommonModule, FormsModule],  // <-- make directives available
  templateUrl: './login.html'
  // styleUrls: ['./login.css']          // uncomment only if this file exists
})
export class LoginComponent {
  email = 'admin@example.com';
  password = 'Admin123!';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    this.error = '';
    this.auth.login(this.email, this.password).subscribe({
      next: (res) => { this.auth.saveToken(res.token); this.router.navigate(['/trips']); },
      error: (e) => { this.error = e?.error?.message || 'Login failed'; }
    });
  }
}
