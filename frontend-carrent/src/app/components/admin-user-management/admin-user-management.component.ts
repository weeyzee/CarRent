import { Component, OnInit } from '@angular/core';
import { UserService, UserDto } from '../../services/user.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-user-management',
  standalone: true,
  templateUrl: './admin-user-management.component.html',
  styleUrls: ['./admin-user-management.component.css'],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AdminUserManagementComponent implements OnInit {
  users: UserDto[] = [];
  editUser: UserDto | null = null;

  constructor(private userService: UserService, private router: Router, ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: users => {
        this.users = users;
        console.log('Пользователи:', this.users,  'Id', this.users[0].userId);
      },
      error: err => console.error('Ошибка загрузки пользователей:', err)
    });
  }

  startEdit(user: UserDto): void {
    this.editUser = { ...user }; // копируем, чтобы не менять оригинал
  }

  saveEdit(): void {
    if (this.editUser) {
      this.userService.updateUser(this.editUser.userId, this.editUser).subscribe({
        next: updatedUser => {
          console.log('Обновлен пользователь:', updatedUser);
          this.editUser = null;
          this.loadUsers(); // перезагрузить список
        },
        error: err => console.error('Ошибка обновления пользователя:', err)
      });
    }
  }

  cancelEdit(): void {
    this.editUser = null;
  }

  deleteUser(userId: number): void {
    if (confirm('Вы уверены, что хотите удалить пользователя? C ID: ' + userId)) {
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          console.log('Пользователь удалён');
          this.loadUsers();
        },
        error: err => console.error('Ошибка удаления пользователя:', err)
      });
    }
  }

  goToCars() {
    this.router.navigate(['/cars']);
  }
}