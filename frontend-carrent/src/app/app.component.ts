import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button'; // Импорт кнопок
import { MatToolbarModule } from '@angular/material/toolbar'; // Импорт панели инструментов
import { MatSidenavModule } from '@angular/material/sidenav'; // Импорт боковой панели
import { MatIconModule } from '@angular/material/icon'; // Импорт иконок
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, MatButtonModule, MatToolbarModule, MatSidenavModule, MatIconModule,  HeaderComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend-carrent';
}
