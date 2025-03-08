import type { Pagination } from './pagination';

export default interface InstituteEcosystem {
  id: string;
  logoUrl: string;
  name: string;
  link: string;
  isShow: boolean;
  createDate: string;
  updateDate: string;
}

export interface HumanResourcePagination {
  instituteEcosystems: InstituteEcosystem[];
  pagination: Pagination;
}
