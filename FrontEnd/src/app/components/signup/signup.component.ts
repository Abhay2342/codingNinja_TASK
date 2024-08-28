import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SuccessModalComponent } from '../../success-modal/success-modal.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    SuccessModalComponent,
    MatDialogModule
  ]
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.signupForm.valid) {
      const { username, email, password } = this.signupForm.value;

      this.authService.register({ username, email, password }).subscribe({
        next: (response) => {
          this.authService.storeToken(response.token); // Store JWT token
          this.authService.storeUser({
            id: response.id,
            username: response.username,
            email: response.email,
            token: response.token
          }); // Store user data
          this.dialog.open(SuccessModalComponent, {
            data: {
              message: 'Signup successful! Welcome aboard!',
              response: response
            }
          });
          this.router.navigate(['/tasks']); // Navigate to tasks route
        },
        error: (err) => {
          this.errorMessage = err.error.message || 'An error occurred during registration.';
        }
      });
    }
  }
}
