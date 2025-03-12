import { z } from 'zod';

// Schema mới phù hợp với dữ liệu được yêu cầu
export const reservationFormSchema = z.object({
  fullName: z.string().min(1, 'Họ và tên là bắt buộc'),
  content: z.string().min(1, 'Nội dung là bắt buộc'),
  status: z.string().min(1, 'Trạng thái là bắt buộc'),
  consultDate: z.string().date('Ngày tư vấn là bắt buộc'),
  phone: z.string().min(10, 'Số điện thoại phải có ít nhất 10 ký tự').optional(),
  gmail: z.string().email('Email không hợp lệ').optional(),
  type: z.string().min(1, 'Hình thức tư vấn là bắt buộc'),
  address: z.string().optional(),
  subject: z.string().min(1, 'Vấn đề tư vấn là bắt buộc'),
  file: z.string().optional(),
});

// Kiểu dữ liệu từ schema
export type ReservationFormData = z.infer<typeof reservationFormSchema>;
