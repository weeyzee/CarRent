import { Injectable } from '@angular/core';
import { NativeDateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';

@Injectable()
export class CustomDateAdapter extends NativeDateAdapter {
  // Переопределяем метод для преобразования даты в строку
  override format(date: Date, displayFormat: Object): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  // Переопределяем метод для парсинга строки в дату
  override parse(value: any): Date | null {
    if (value && typeof value === 'string') {
      const dateParts = value.split('/');
      const day = parseInt(dateParts[0], 10);
      const month = parseInt(dateParts[1], 10) - 1;
      const year = parseInt(dateParts[2], 10);
      return new Date(year, month, day);
    }
    return super.parse(value);
  }
}

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: { year: 'numeric', month: 'numeric', day: 'numeric' },
  },
  display: {
    dateInput: 'input',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: { year: 'numeric', month: 'numeric', day: 'numeric' },
    monthDayA11yLabel: 'MMMM dd',
  },
};