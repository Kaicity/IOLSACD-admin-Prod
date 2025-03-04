import { z } from 'zod';

// Schema cho form human resource
export const humanResourceFormSchema = z.object({
  fullName: z.string().min(1, 'Họ và tên là bắt buộc'),
  imgUrl: z.string(),
  phone: z.string().min(10, 'Số điện thoại phải có ít nhất 10 ký tự'),
  gmail: z.string().email('Email không hợp lệ'),
  role: z.string().min(1, 'Vui lòng chọn vai trò'),
  description: z.string().optional(),
});

// Kiểu dữ liệu từ schema nha
export type humanResourceFormData = z.infer<typeof humanResourceFormSchema>;
