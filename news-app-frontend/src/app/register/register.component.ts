import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [
    FormsModule
  ]
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';

  constructor(private apiService: ApiService) {}

  onRegister() {
    this.apiService.register(this.username, this.email, this.password).subscribe({
      next: () => alert('Registration successful!'),
      error: (err) => alert('Registration failed!'),
    });
  }
}
