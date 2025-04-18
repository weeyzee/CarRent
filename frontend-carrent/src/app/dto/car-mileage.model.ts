export interface CarMileage {
    id: number;
    carId: number;
    mileage: number; // Пробег
    timeStamp: Date | null;   // Время обновления пробега
  }
  