import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { BookingService } from '../../services/booking.service';
import { CarService } from '../../services/car.service';
import { UserService } from '../../services/user.service';
import { Car } from '../../dto/car.model';
import { Router } from '@angular/router';
import { User } from '../../dto/user.model';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ChangeDetectorRef } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MatNativeDateModule } from '@angular/material/core';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatIcon,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  form!: FormGroup;
  cars: Car[] = [];
  selectedCarId: number | null = null;
  isLoggedIn = false;
  get FlagRole(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;
    
    try {
        const decodedToken: any = jwtDecode(token);
        return decodedToken.role === 'ADMIN';
    } catch {
        console.error('ошибк декордирования токена');
        return false;
    }
}
  authForm!: FormGroup;
  hide = true;
  showLoginForm = false;
  minDate = new Date(Date.now() + 24 * 60 * 60 * 1000);

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dialogService: DialogService,
    private carService: CarService,
    private userService: UserService,
    private bookingService: BookingService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.authForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\+7\d{10}$/) 
        ]
      ],
      licenseNum: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{10}$/) 
        ]
      ]
    });

    this.form = this.fb.group({
      startTime: ['']
    });
    this.cars = [
      { carId: 0, brand: 'Toyota', model: 'Corolla', licensePlate: '', status: 'Available' },
      { carId: 1, brand: 'BMW', model: 'X5M', licensePlate: '', status: 'Available' },
      { carId: 2, brand: 'Audi', model: 'RS6', licensePlate: '', status: 'Available' },
      { carId: 3, brand: 'Audi', model: 'RS7', licensePlate: '', status: 'Available' }
    ];
    this.isLoggedIn = !!localStorage.getItem('token');
  }

  login() {
    const { email, password } = this.authForm.value;
    this.userService.loginUser(email, password).subscribe({
      next: (response) => {
        if (response.token) {
          localStorage.setItem('token', response.token); // Сохраняем токен
          this.isLoggedIn = true;
          this.cdRef.detectChanges();
          console.log('✅ Успешный вход!');
          // this.setRoleFromToken();
          
        } else {
          console.log('❌ Токен не получен!');
        }
      },
      error: async (err) => {
        await this.dialogService.alert('Неправильный логин или пароль!');
        // console.error('❌ Ошибка авторизации:', err);
      }
    });
  }

  registerUser() {
    const { name, email, phoneNumber, licenseNum, password } = this.authForm.value;
    const newUser = { name, email, phoneNumber, licenseNum, password };
    this.userService.createUser(newUser).subscribe({
      next: () => {
        console.log('✅ Регистрация успешна!')
        this.userService.loginUser(email, password).subscribe({
          next: (response) => {
            if (response.token) {
              localStorage.setItem('token', response.token); // сохранио токен
              this.isLoggedIn = true;
              this.cdRef.detectChanges();
              console.log('✅ Успешный вход!');
            } else {
              console.error('❌ Токен не получен!');
            }
          },
          error:(err) => {        
            console.error('❌ Ошибка авторизации:', err);
          }
        });
      },
      error: (err) => {
        console.error('❌ Ошибка регистрации:', err);}
      
    });
  }
  
  togglePasswordVisibility(input: HTMLInputElement) {
    this.hide = !this.hide;
    setTimeout(() => input.focus(), 0); // про фокус
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    console.log('Ошибка загрузки:', img.src);
    console.log('Пробую загрузить:', './assets/cars/default.jpg');
    img.src = './assets/cars/default.jpg';
  }

  selectCar(carId: number) {
    this.selectedCarId = carId;
  }

  submitBooking() {
    const selectedCar = this.cars.find(c => c.carId === this.selectedCarId);
    if (!selectedCar) return;
    console.log('Ищу машину бренда:', selectedCar.brand);
    this.carService.getAvailableCarByBrand(selectedCar.brand).subscribe({
      next: (car) => {
        const userId = this.getUserIdFromToken(); 
        if (!userId) {
          console.log('❌ Ошибка: пользователь не авторизован!');
          return;
        }

        const bookingData = {
          ...this.form.value,
          userId, 
          carId: car.carId,
          status: 'ACTIVE'
        };

        this.bookingService.createBooking(bookingData).subscribe({
          next: async (res) => {
            console.log('✅ Бронирование создано!');
            await this.dialogService.alert('Бронирование успешно создано! Машину доставят к вам в течение 15 минут!');
            this.router.navigate(['/trip-form', res.bookingId]);
          },
          error: (err) => console.error('❌ Ошибка бронирования:', err)
        });
      },
      error: () => {
        const msg = `❌ Нет доступных машин марки ${selectedCar.brand}`;
        console.log(msg);
        this.dialogService.alert(msg);
      }
    });
  }

  getUserIdFromToken(): number | null {
    const token = localStorage.getItem('token');
    if (!token) return null;
  
    try {
      const decodedToken: any = jwtDecode(token);
      console.log('decodedToken.userId:', decodedToken.userId); 
      return decodedToken.userId || null; 
      
    } catch (error) {
      console.error('oшибка декодирования токена:', error);
      return null;
    }
  }

  goToProfile() {
    this.router.navigate(['/user-profile']);
  }

  goToAdmin() {
    this.router.navigate(['/admin']);
  }

  logout(): void {
    localStorage.removeItem('token'); // Удаляем токен
    this.isLoggedIn = false;
    console.log('✅Вы вышли из системы!');
    this.router.navigate(['/'])
  }
}
