import type { AccountPagination } from '../models/features/account';
import type Account from '../models/features/account';
import type LoginRequest from '../models/features/login';
import { instance } from './index';

export const login = async (login: LoginRequest): Promise<string> => {
  try {
    const response = await instance.post('account/login', login);

    if (response.data?.statusCode === 200) {
      return response.data?.data?.accessToken;
    } else {
      throw new Error('Failed to request login account so not success');
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage);
  }
};

export const getUserInfo = async (): Promise<Account | null> => {
  try {
    const response = await instance.get('account/i');
    if (response.data?.statusCode === 200) {
      return response.data.status;
    } else {
      return null;
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage);
  }
};

interface FilterParams {
  role?: string;
  search?: string;
}

export const getUsers = async (page: number, limit: number, total: number, filters: FilterParams): Promise<AccountPagination> => {
  try {
    const response = await instance.get(`account`, {
      params: {
        page,
        limit,
        total,
        role: filters.role,
        search: filters.search,
      },
    });

    if (response.data?.statusCode === 200 && response.data?.data) {
      return {
        accounts: response.data?.data.accounts,
        pagination: {
          page: response.data?.data.pagination.page,
          limit: response.data?.data.pagination.limit,
          total: response.data?.data.pagination.total,
        },
      };
    } else {
      throw new Error('Failed to fetch orders');
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage);
  }
};

export const createUserIsGlobalAdmin = async (account: any): Promise<boolean> => {
  try {
    const response = await instance.post(`account/gadmin`, account);

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

export const createUserIsIT = async (account: any): Promise<boolean> => {
  try {
    const response = await instance.post(`account/it`, account);

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

export const createUserIsAdmin = async (account: any): Promise<boolean> => {
  try {
    const response = await instance.post(`account/admin`, account);

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

export const deleteUserById = async (id: string): Promise<boolean> => {
  try {
    const response = await instance.delete(`account/${id}`);

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

export const updateUserById = async (user: any, id: string): Promise<boolean> => {
  try {
    const response = await instance.put(`account/${id}`, user);

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
