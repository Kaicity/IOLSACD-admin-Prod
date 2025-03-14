import { z } from 'zod';

// Schema cho bài viết
export const articleFormSchema = z.object({
  title: z.string().min(1, 'Tiêu đề là bắt buộc'),
  preview_img: z.string().min(1, 'Hình ảnh là bắt buộc'),
  type: z.string().min(1, 'Vui lòng chọn loại bài báo'),
  summary: z.string().min(1, 'Nội dung tóm tắt là bắt buộc'),
  content: z.string().min(1, 'Nội dung bố cục bài báo là bắt buộc'),
  language: z.string().min(1, 'Ngôn ngữ bài báo là bắt buộc'),
});

// Kiểu dữ liệu từ schema
export type ArticleFormData = z.infer<typeof articleFormSchema>;
