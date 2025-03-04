import type { Pagination } from './pagination';

export default interface HumanResource {
  id: string;
  fullName: string;
  imgUrl: string;
  phone: string;
  gmail: string;
  role: string;
  description: string;
  isShow: boolean;
  createDate: string;
  updateDate: string;
  isExist: boolean;
}

export interface HumanResourcePagination {
  members: HumanResource[];
  pagination: Pagination;
}
