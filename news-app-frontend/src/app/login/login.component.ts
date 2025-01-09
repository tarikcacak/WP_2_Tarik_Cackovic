import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { ApiService } from '../api.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    FormsModule,
    RouterLink
  ]
})
export class LoginComponent {
  email = '';
  password = '';

  readonly constants = {
    logoUrl: 'assets/img/news-app-logo.png'
  }

  constructor(private apiService: ApiService, private router: Router) {}

  onLogin() {
    this.apiService.login(this.email, this.password).subscribe({
      next: (response) => {
        if (response.is_admin === 1) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err) => alert('Invalid credentials'),
    });
  }
}
