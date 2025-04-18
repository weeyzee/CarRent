export interface Payment {
    paymentId: number;
    tripId: number; // ID поездки
    amount: number; // Сумма оплаты
    paymentMethod: string; // Метод оплаты, например, "credit card", "cash"
    paymentDate: Date;
  }
  