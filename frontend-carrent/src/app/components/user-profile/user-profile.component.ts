import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../../services/user.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule, MatCardModule],
  standalone: true,
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  userProfile: any;
  trips: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const userId = this.getUserIdFromToken();
    if (userId !== null) {
      this.userService.getUserById(userId).subscribe({
        next: data => {
          this.userProfile = data;
          console.log('User Profile:', this.userProfile);
        },
        error: err => console.error('Ошибка при получении профиля', err)
      });

      this.userService.getTripsByUserId(userId).subscribe({
        next: data => {
          this.trips = data;
          console.log('Trips:', this.trips);
        },
        error: err => console.error('Ошибка при получении поездок', err)
      });
    } else {
      console.error('User ID not found in token.');
    }
  }

  getUserIdFromToken(): number | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.userId || null;
    } catch (error) {
      console.error('Ошибка декодирования токена:', error);
      return null;
    }
  }
}
