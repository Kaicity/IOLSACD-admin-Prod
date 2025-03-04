import { z } from "zod";

// Schema cho form human resource
export const accountFormSchema = z.object({
  userName: z.string().min(1, "Vui lòng điền tên đăng nhập"),
  password: z.string().min(1, "Vui lòng điền mật khẩu"),
});

// Kiểu dữ liệu từ schema nha
export type accountFormData = z.infer<typeof accountFormSchema>;
