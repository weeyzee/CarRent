export interface Trip {
    tripId?: number;
    bookingId: number; // ID бронирования
    distance: number; // Пройденное расстояние
    price: number; // Стоимость поездки
    completed: boolean; // Завершена ли поездка
    startLocation: string; // Начальная локация
    endLocation: string; // Конечная локация
  }
  