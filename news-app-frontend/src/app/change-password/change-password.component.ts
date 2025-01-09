import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  imports: [
    FormsModule,
    NgIf,
  ],
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
  email: string = ''; // New email field
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private apiService: ApiService) {}

  onChangePassword() {
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'New password and confirm password must match.';
      return;
    }

    const email = this.email;
    const oldPassword = this.oldPassword;
    const newPassword = this.newPassword;

    this.apiService.changePassword(email,oldPassword, newPassword).subscribe({
      next: (response) => {
        if (response) {
          this.successMessage = 'Password changed successfully!';
          this.errorMessage = '';
        } else {
          this.errorMessage = response.message || 'Failed to change password.';
        }
      },
      error: (error) => {
        this.errorMessage = 'An error occurred while changing password.';
      }
    });
  }
}
