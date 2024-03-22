export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  address?: string;
  bookings?: string[];
}

export interface AuthFormData {
  email?: string;
  password?: string;
  name?: string;
}
