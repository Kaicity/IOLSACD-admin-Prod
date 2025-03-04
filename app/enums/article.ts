export enum ArticleType {
  ABOUT = 'ABOUT',
  SERVICE = 'SERVICE',
  NEWS = 'NEWS',
  KNOWLEDGE = 'KNOWLEDGE',
}

export const ARTICLE_TYPE_LABEL: Record<ArticleType, string> = {
  [ArticleType.ABOUT]: 'Giới Thiệu',
  [ArticleType.SERVICE]: 'Dịch Vụ',
  [ArticleType.NEWS]: 'Tin Tức',
  [ArticleType.KNOWLEDGE]: 'Kiến Thức',
};

export const ARTICLE_TYPE_STYLES: Record<ArticleType, string> = {
  [ArticleType.ABOUT]: 'bg-gray-100 text-gray-600',
  [ArticleType.SERVICE]: 'bg-blue-100 text-blue-600',
  [ArticleType.NEWS]: 'bg-purple-100 text-purple-600',
  [ArticleType.KNOWLEDGE]: 'bg-green-100 text-green-600',
};
