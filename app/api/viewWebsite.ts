import { instance } from '.';
import type { ViewWebsite } from '../models/features/viewWebsite';

export const getViewWebsites = async (year: number): Promise<ViewWebsite[]> => {
  try {
    const response = await instance.get(`viewWebsite/${year}`);
    if (response.data?.statusCode === 200 && response.data?.data) {
      return response.data?.data;
    } else {
      throw new Error('Failed to fetch view website');
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message;
    throw new Error(errorMessage);
  }
};
