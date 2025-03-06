import { instance } from '.';
import type Reservation from '../models/features/reservation';
import type { ReservationPagination } from '../models/features/reservation';

interface FilterParams {
  query?: string;
  type?: string;
  startDate?: string;
  endDate?: string;
}

export const getReservation = async (
  page: number,
  limit: number,
  total: number,
  filters: FilterParams,
): Promise<ReservationPagination> => {
  try {
    const response = await instance.get(`reservation`, {
      params: {
        page,
        limit,
        total,
        query: filters.query,
        type: filters.type,
        startDate: filters.startDate,
        endDate: filters.endDate,
      },
    });

    if (response.data?.statusCode === 200 && response.data?.data) {
      return {
        reservations: response.data?.data.reservations,
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

export const createReservation = async (reservation: any): Promise<boolean> => {
  try {
    const response = await instance.post(`reservation`, reservation);

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

export const deleteReservationById = async (id: string): Promise<boolean> => {
  try {
    const response = await instance.delete(`reservation/${id}`);

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

export const updateReservationById = async (reservation: any, id: string): Promise<boolean> => {
  try {
    const response = await instance.put(`reservation/${id}`, reservation);

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

export const getReservationById = async (id: string): Promise<Reservation | null> => {
  try {
    const response = await instance.get(`reservation/${id}`);

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
