import { instance } from '.';
import type Article from '../models/features/arcicle';
import type { ArticlePagination } from '../models/features/arcicle';
import type { ViewArticle } from '../models/features/viewArticle';

interface FilterParams {
  search?: string;
}

export const getArticles = async (
  page: number,
  limit: number,
  total: number,
  filters: FilterParams,
): Promise<ArticlePagination> => {
  try {
    const response = await instance.get(`article`, {
      params: {
        page,
        limit,
        total,
        search: filters.search,
      },
    });

    if (response.data?.statusCode === 200 && response.data?.data) {
      return {
        articles: response.data?.data.articles,
        pagination: {
          page: response.data?.data.pagination.page,
          limit: response.data?.data.pagination.limit,
          total: response.data?.data.pagination.total,
        },
      };
    } else {
      throw new Error('Failed to fetch Article');
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage);
  }
};

export const getArticlesRecently = async (limit: number): Promise<ArticlePagination> => {
  try {
    const response = await instance.get(`article`, {
      params: {
        limit,
      },
    });

    if (response.data?.statusCode === 200 && response.data?.data) {
      return {
        articles: response.data?.data.articles,
        pagination: {
          page: response.data?.data.pagination.page,
          limit: response.data?.data.pagination.limit,
          total: response.data?.data.pagination.total,
        },
      };
    } else {
      throw new Error('Failed to fetch Article');
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage);
  }
};

export const getArticleById = async (id: string): Promise<Article | null> => {
  try {
    const response = await instance.get(`article/${id}`);

    if (response.data?.statusCode === 200) {
      return response.data?.data;
    } else {
      return null;
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage);
  }
};

export const createArticle = async (Article: any): Promise<boolean> => {
  try {
    const response = await instance.post(`article`, Article);

    if (response.data?.statusCode === 201) {
      return true;
    } else {
      return false;
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage);
  }
};

export const deleteArticleById = async (id: string): Promise<boolean> => {
  try {
    const response = await instance.delete(`article/${id}`);

    if (response.data?.statusCode === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage);
  }
};

export const updateArticleById = async (Article: any, id: string): Promise<boolean> => {
  try {
    const response = await instance.put(`article/${id}`, Article);

    if (response.data?.statusCode === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage);
  }
};

export const getAllArticleStatisticByYear = async (year: number): Promise<ViewArticle[]> => {
  try {
    const response = await instance.get(`article/statistic/${year}`);
    if (response.data?.statusCode === 200 && response.data?.data) {
      return response.data?.data;
    } else {
      throw new Error('Failed to fetch view article');
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage);
  }
};
