import { z } from 'zod';

// Schema mới phù hợp với dữ liệu được yêu cầu
export const consultationFormSchema = z.object({
  fullName: z.string().min(1, 'Họ và tên là bắt buộc'),
  content: z.string().min(1, 'Nội dung là bắt buộc'),
  type: z.string().min(1, 'Loại hình thức là bắt buộc'),
  status: z.string().min(1, 'Trạng thái là bắt buộc'),
  consultDate: z.string().min(1, 'Ngày tư vấn là bắt buộc'),
  phone: z.string().min(10, 'Số điện thoại phải có ít nhất 10 ký tự').optional(),
  gmail: z.string().email('Email không hợp lệ').optional(),
  address: z.string().optional(),
  subject: z.string().optional(),
  file: z.string().optional(),
});

// Kiểu dữ liệu từ schema
export type ConsultationFormData = z.infer<typeof consultationFormSchema>;
