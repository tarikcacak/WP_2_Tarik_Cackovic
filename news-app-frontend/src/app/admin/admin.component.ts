import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  imports: [
    NgForOf,
    NgIf
  ]
})
export class AdminComponent implements OnInit {
  users: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.apiService.getUsers().subscribe((response) => {
      this.users = response;
    });
  }

  toggleAdmin(user: any) {
    if (user.is_admin) {
      this.apiService.removeAdmin(user.id).subscribe(() => this.fetchUsers());
    } else {
      this.apiService.makeAdmin(user.id).subscribe(() => this.fetchUsers());
    }
  }

  editUser(user: any) {
    // Otvaranje dijaloga za uređivanje korisnika (implementacija nije obuhvaćena ovim kodom)
    alert(`Edit user functionality for ${user.username} to be implemented.`);
  }

  deleteUser(userId: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.apiService.deleteUser(userId).subscribe(() => this.fetchUsers());
    }
  }
}
