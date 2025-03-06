import type { Pagination } from './pagination';

export default interface Reservation {
  id: string;
  fullName: string;
  phone: string;
  gmail: string;
  address: string;
  content: string;
  subject: string;
  file?: string;
  consultDate: string;
  created_date: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
}

export interface ReservationPagination {
  reservations: Reservation[];
  pagination: Pagination;
}
