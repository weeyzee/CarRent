import { Component } from '@angular/core';

import { MatButtonModule } from '@angular/material/button'; // Импорт кнопок
import { MatToolbar } from '@angular/material/toolbar';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule, RouterModule,],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
