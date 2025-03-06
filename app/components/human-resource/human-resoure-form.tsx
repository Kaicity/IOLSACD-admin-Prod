'use client';

import { SubmitButton } from '@/app/components/dashboard/SubmitButton';
import type HumanResource from '@/app/models/features/human-resource';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UploadDropzone } from '@/lib/uploadthing';
import { X } from 'lucide-react';
import Image from 'next/image';
import { startTransition, useActionState, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { humanResourceFormSchema, type humanResourceFormData } from '@/app/schemas/human-resource-schema';
import { createHumanResource, updateHumanResourceById } from '@/app/api/human-resource';
import { Textarea } from '@/components/ui/textarea';
import { HUMAN_RESOURCE_OPTIONS } from '@/app/constants/humanResourceOption';

export default function HumanResourceForm({
  mode,
  humanResource,
  isDialogOpen,
  setIsDialogOpen,
  reloadData,
}: { humanResource: HumanResource } & {
  mode: string;
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  reloadData: () => void;
}) {
  const [currentProfileImage, setCurrentProfileImage] = useState('');

  const handleDeleteImage = () => {
    setCurrentProfileImage('');
  };

  const {
    register,
    setValue,
    trigger,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<humanResourceFormData>({
    resolver: zodResolver(humanResourceFormSchema),
    defaultValues: { fullName: '', gmail: '', imgUrl: '', phone: '', role: '', description: '' },
  });

  const [state, submitAction, isPending] = useActionState(async (prevState: any, formData: humanResourceFormData) => {
    try {
      if (mode === 'CREATE') {
        console.log(formData);

        const request = await createHumanResource(formData);
        if (request) {
          toast.success('Tạo nhân sự thành công!');
          reset({ fullName: '', gmail: '', imgUrl: '', phone: '', role: '', description: '' });
          setIsDialogOpen(false);
          reloadData?.();
        } else {
          toast.error('Tạo nhân sự thất bại!');
        }
      } else {
        const request = await updateHumanResourceById(formData, humanResource?.id);
        if (request) {
          toast.success('Cập nhật nhân sự thành công!');
          reset({ fullName: '', gmail: '', imgUrl: '', phone: '', role: '', description: '' });
          setIsDialogOpen(false);
          reloadData?.();
        } else {
          toast.error('Cập nhật nhân sự thất bại!');
        }
      }
    } catch (error) {
      toast.error('Đã có lỗi xảy ra khi thao tác dữ liệu');
    }
  }, undefined);

  const onSubmit = (data: humanResourceFormData) => {
    startTransition(() => {
      submitAction(data);
    });
  };

  useEffect(() => {
    if (mode === 'UPDATE' && humanResource) {
      setCurrentProfileImage(humanResource?.imgUrl);
      reset(humanResource);
    } else {
      setCurrentProfileImage('');
      reset({ fullName: '', gmail: '', imgUrl: '', phone: '', role: '', description: '' });
    }
  }, [mode, humanResource, reset]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="max-w-full max-h-[600px] md:max-w-[625px] md:max-h-[500px] lg:max-w-[825px] lg:max-h-full overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-primary">{mode === 'CREATE' ? 'Tạo nhân sự' : 'Cập nhật thông tin'}</DialogTitle>
          <DialogDescription>
            {mode === 'CREATE' ? 'Điền các thông tin của nhân sự' : 'Cập nhật các thông tin của nhân sự'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center gap-4">
            {/* Full Name */}
            <div className="flex flex-col gap-y-2 col-span-4 lg:col-span-2">
              <Label>Họ tên</Label>
              <Input id="fullName" placeholder="Nhập họ tên đầy đủ" {...register('fullName')} />
              {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-y-2 col-span-4 lg:col-span-2">
              <Label>Số điện thoại</Label>
              <Input id="phone" placeholder="Nhập số điện thoại" {...register('phone')} />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-y-2 col-span-4 lg:col-span-2">
              <Label>Email</Label>
              <Input id="gmail" placeholder="nguyenvana@gmail.com" {...register('gmail')} />
              {errors.gmail && <p className="text-red-500 text-sm">{errors.gmail.message}</p>}
            </div>

            {/* Role */}
            <div className="flex flex-col gap-y-2 col-span-4 lg:col-span-2">
              <Label>Vai trò</Label>
              <Select
                defaultValue={humanResource?.role}
                onValueChange={(value) => {
                  setValue('role', value);
                  trigger('role');
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn vai trò" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {HUMAN_RESOURCE_OPTIONS.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
            </div>

            {/* Mo Ta */}
            <div className="flex flex-col gap-y-2 col-span-4">
              <Label>Mô Tả</Label>
              <Textarea id="description" placeholder="Nhập nội dung.." {...register('description')} className="min-h-[200px]" />
              {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex flex-col gap-y-2 relative mt-4">
            <Label>Hình ảnh cá nhân</Label>
            <Input
              id="imgPath"
              {...register('imgUrl')}
              value={currentProfileImage}
              onChange={(e) => setValue('imgUrl', e.target.value)}
              className="sr-only"
            />
            {currentProfileImage ? (
              <div className="relative size-16">
                <Image
                  src={currentProfileImage}
                  alt="profileImage"
                  className="object-cover size-16 rounded-md"
                  width={64}
                  height={64}
                />
                <Button
                  onClick={handleDeleteImage}
                  variant="destructive"
                  className="absolute w-4 h-7 -top-3 -right-3 rounded-full"
                  type="button"
                >
                  <X className="w-4 h-4"></X>
                </Button>
              </div>
            ) : (
              <UploadDropzone
                onClientUploadComplete={(res) => {
                  const url = res[0].url;
                  setCurrentProfileImage(url);
                  setValue('imgUrl', url); // Cập nhật vào form
                  toast.success('Hình ảnh của bạn đã được upload');
                }}
                onUploadError={(error) => {
                  console.log('Đã có lỗi xảy ra khi upload file', error);
                  toast.error(error.message);
                }}
                endpoint="singleImageUploader"
              />
            )}
            {errors.imgUrl && <p className="text-red-500 text-sm">{errors.imgUrl.message}</p>}
          </div>

          <DialogFooter className="mt-4">
            <SubmitButton text="Lưu thông tin" variant="default" isPending={isPending} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
