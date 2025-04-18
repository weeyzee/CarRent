import { Component } from '@angular/core';

import { MatButtonModule } from '@angular/material/button'; // Импорт кнопок
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule, RouterModule, RouterLink, MatToolbar],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
