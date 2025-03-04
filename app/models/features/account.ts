import type { Pagination } from './pagination';

export default interface Account {
  id: string;
  name: string;
  userName: string;
  password: string;
  role: string;
  createdDate: string;
  updateDate: string;
}

export interface AccountPagination {
  accounts: Account[];
  pagination: Pagination;
}
