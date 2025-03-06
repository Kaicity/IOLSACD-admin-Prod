import type { Pagination } from './pagination';

export default interface Reservation {
  id: string;
  fullName: string;
  phone: string;
  gmail: string;
  address: string;
  content: string;
  type: string;
  subject: string;
  file: string;
  consultDate: string;
  createdDate: string;
  updatedDate: string;
  status: string;
}

export interface ReservationPagination {
  reservations: Reservation[];
  pagination: Pagination;
}
