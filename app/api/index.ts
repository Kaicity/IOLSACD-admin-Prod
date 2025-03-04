import axios from 'axios';
import Cookies from 'js-cookie';

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor để gắn token vào header
instance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('authToken'); // Lấy token từ cookies
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Thêm interceptor xử lý các lỗi
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      alert('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại');
      Cookies.remove('authToken');
      Cookies.remove('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  },
);
