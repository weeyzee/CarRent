export interface Booking {
    bookingId: number;
    carId: number; // ID машины
    userId: number; // ID пользователя
    startTime: Date;
    endTime: Date;
    status: string; // Статус бронирования, например, "confirmed", "pending"
  }
  