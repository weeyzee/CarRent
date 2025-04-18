export interface User {
    userId: number;
    name: string;
    email: string;
    phoneNumber: string;
    licenseNum: string;
    registrationDate: Date;
    password: string; // Для безопасности, в реальном проекте обычно не передают пароль в DTO
  }
  