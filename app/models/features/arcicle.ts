import type { Pagination } from './pagination';

export default interface Article {
  id: string;
  title: string;
  preview_img: string;
  type: string;
  summary: string;
  content: string;
  view: number;
  createDate: string;
  updateDate: string;
}

export interface ArticlePagination {
  articles: Article[];
  pagination: Pagination;
}
