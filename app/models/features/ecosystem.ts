import type { Pagination } from './pagination';

export interface Ecosystem {
  id: string;
  fullName: string;
  englishName: string;
  imgUrl: string;
  isShow: boolean;
  createDate: string;
  updateDate: string;
}

export interface EcoSystemPagination {
  ecosystems: Ecosystem[];
  pagination: Pagination;
}
