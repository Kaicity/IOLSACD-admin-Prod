import { instance } from '.';
import type { EcoSystemPagination } from '../models/features/ecosystem';
import type Ecosystem from '../models/features/human-resource';

interface FilterParams {
  query?: string;
}

export const getEcosystem = async (
  page: number,
  limit: number,
  total: number,
  filters: FilterParams,
): Promise<EcoSystemPagination> => {
  try {
    const response = await instance.get(`ecosystem`, {
      params: {
        page,
        limit,
        total,
        search: filters.query,
      },
    });

    if (response.data?.statusCode === 200 && response.data?.data) {
      return {
        ecosystems: response.data?.data.Ecosystems,
        pagination: {
          page: response.data?.data.pagination.page,
          limit: response.data?.data.pagination.limit,
          total: response.data?.data.pagination.total,
        },
      };
    } else {
      throw new Error('Failed to fetch ecosystem');
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage);
  }
};

export const createEcosystem = async (Ecosystem: any): Promise<boolean> => {
  try {
    const response = await instance.post(`ecosystem`, Ecosystem);

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

export const deleteEcosystemById = async (id: string): Promise<boolean> => {
  try {
    const response = await instance.delete(`ecosystem/${id}`);

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

export const updateEcosystemById = async (Ecosystem: any, id: string): Promise<boolean> => {
  try {
    const response = await instance.put(`ecosystem/${id}`, Ecosystem);

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

export const getEcosystemById = async (id: string): Promise<Ecosystem | null> => {
  try {
    const response = await instance.get(`ecosystem/${id}`);

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
