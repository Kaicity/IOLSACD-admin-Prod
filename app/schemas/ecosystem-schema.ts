import { z } from 'zod';

export const ecosystemFormSchema = z.object({
  fullName: z.string().min(1, 'Tên là bắt buộc'),
  englishName: z.string().min(1, 'Tên tiếng Anh là bắt buộc'),
  imgUrl: z.string().optional(),
});

export type EcosystemFormData = z.infer<typeof ecosystemFormSchema>;
