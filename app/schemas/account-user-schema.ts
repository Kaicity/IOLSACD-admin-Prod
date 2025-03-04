import { z } from 'zod';

// Schema cho form human resource
export const accountUserFormSchema = z.object({
  name: z.string().min(1, 'Họ tên là bắt buộc'),
  userName: z.string().min(1, 'Vui lòng điền tên đăng nhập'),
  password: z.string().min(1, 'Vui lòng điền mật khẩu'),
});

// Kiểu dữ liệu từ schema nha
export type accountUserFormData = z.infer<typeof accountUserFormSchema>;
