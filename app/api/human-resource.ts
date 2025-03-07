import { instance } from '.';
import type HumanResource from '../models/features/human-resource';
import type { HumanResourcePagination } from '../models/features/human-resource';

interface FilterParams {
  query?: string;
  role?: string;
  isShow?: boolean;
}

export const getHumanResource = async (
  page: number,
  limit: number,
  total: number,
  filters: FilterParams,
): Promise<HumanResourcePagination> => {
  try {
    const response = await instance.get(`member`, {
      params: {
        page,
        limit,
        total,
        query: filters.query,
        role: filters.role,
        isShow: filters.isShow,
      },
    });

    if (response.data?.statusCode === 200 && response.data?.data) {
      return {
        members: response.data?.data.members,
        pagination: {
          page: response.data?.data.pagination.page,
          limit: response.data?.data.pagination.limit,
          total: response.data?.data.pagination.total,
        },
      };
    } else {
      throw new Error('Failed to fetch human resource');
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage);
  }
};

export const createHumanResource = async (humanResource: any): Promise<boolean> => {
  try {
    const response = await instance.post(`member`, humanResource);

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

export const deleteHumanResourceById = async (id: string): Promise<boolean> => {
  try {
    const response = await instance.delete(`member/${id}`);

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

export const updateHumanResourceById = async (humanResource: any, id: string): Promise<boolean> => {
  try {
    const response = await instance.put(`member/${id}`, humanResource);

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

export const getHumanResourceById = async (id: string): Promise<HumanResource | null> => {
  try {
    const response = await instance.get(`member/${id}`);

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
