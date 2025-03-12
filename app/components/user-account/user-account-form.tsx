'use client';

import { SubmitButton } from '@/app/components/dashboard/SubmitButton';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { startTransition, useActionState, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type Account from '@/app/models/features/account';
import { accountUserFormSchema, type accountUserFormData } from '@/app/schemas/account-user-schema';
import { ROLE_OPTIONS } from '@/app/constants/routeOption';
import { createUserIsAdmin, createUserIsGlobalAdmin, createUserIsIT, updateUserById } from '@/app/api/auth';
import { UserRole } from '@/app/enums/user-account';

export default function UserAccountForm({
  mode,
  account,
  isDialogOpen,
  setIsDialogOpen,
  reloadData,
}: { account: Account } & {
  mode: string;
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  reloadData: () => void;
}) {
  const [isRoute, setIsRoute] = useState<string>('');

  const {
    register,
    setValue,
    trigger,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<accountUserFormData>({
    resolver: zodResolver(accountUserFormSchema),
    defaultValues: {
      name: '',
      userName: '',
      password: '',
    },
  });

  const [state, submitAction, isPending] = useActionState(async (prevState: any, formData: accountUserFormData) => {
    try {
      if (mode === 'CREATE') {
        switch (isRoute) {
          case UserRole.GLOBAL_ADMIN:
            const requestGlobalAdmin = await createUserIsGlobalAdmin(formData);
            if (requestGlobalAdmin) {
              toast.success('Tạo người dùng Global Admin thành công!');
              reset({ name: '', userName: '', password: '' });
              setIsDialogOpen(false);
              reloadData?.();
            } else {
              toast.error('Tạo người dùng Global Admin thất bại!');
            }
            break;
          case UserRole.ADMIN:
            const requestAdmin = await createUserIsAdmin(formData);
            if (requestAdmin) {
              toast.success('Tạo người dùng Admin thành công!');
              reset({ name: '', userName: '', password: '' });
              setIsDialogOpen(false);
              reloadData?.();
            } else {
              toast.error('Tạo người dùng Admin thất bại!');
            }
            break;
          case UserRole.IT_TECHNICIAN:
            const requestIT = await createUserIsIT(formData);
            if (requestIT) {
              toast.success('Tạo người dùng IT thành công!');
              reset({ name: '', userName: '', password: '' });
              setIsDialogOpen(false);
              reloadData?.();
            } else {
              toast.error('Tạo người dùng IT thất bại!');
            }
            break;

          default:
            toast.error('Không tìm thấy vai trò để tạo');
            break;
        }
      } else {
        const request = await updateUserById(formData, account?.id);
        if (request) {
          toast.success('Cập nhật người dùng thành công!');
          reset({ name: '', userName: '', password: '' });
          setIsDialogOpen(false);
          reloadData?.();
        } else {
          toast.error('Cập nhật người dùng thất bại!');
        }
      }
    } catch (error: any) {
      toast.error(error?.message || 'Mất kết nối với máy chủ, vui lòng đợi phản hồi');
    }
  }, undefined);

  useEffect(() => {
    if (account?.role) {
      setIsRoute(account?.role);
    }

    if (mode === 'UPDATE' && account) {
      reset(account);
    } else {
      reset({ name: '', userName: '', password: '' });
      setIsRoute('');
    }
  }, [mode, account, reset]);

  const onSubmit = (data: accountUserFormData) => {
    startTransition(() => {
      submitAction(data);
    });
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="text-primary">{mode === 'CREATE' ? 'Tạo người dùng' : 'Cập nhật thông tin'}</DialogTitle>
          <DialogDescription>
            {mode === 'CREATE' ? 'Điền các thông tin của người dùng' : 'Cập nhật các thông tin của người dùng'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center gap-4">
            {/* Role */}
            {mode === 'CREATE' && (
              <div className="flex flex-col gap-y-2 col-span-4">
                <Label>Vai trò</Label>
                <Select
                  defaultValue={isRoute}
                  onValueChange={(value) => {
                    console.log(value);

                    setIsRoute(value);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn vai trò" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {ROLE_OPTIONS.map((route) => (
                        <SelectItem key={route.value} value={route.value}>
                          {route.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                {isRoute === '' && <p className="text-red-500 text-sm">Vui lòng chọn vai trò</p>}
              </div>
            )}

            {/* Full Name */}
            <div className="flex flex-col gap-y-2 col-span-4">
              <Label>Họ tên</Label>
              <Input disabled={isRoute === ''} id="name" placeholder="Nhập họ tên đầy đủ" {...register('name')} />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-y-2 col-span-4">
              <Label>Tên đăng nhập</Label>
              <Input disabled={isRoute === ''} id="userName" placeholder="Nhập tên đăng nhập" {...register('userName')} />
              {errors.userName && <p className="text-red-500 text-sm">{errors.userName.message}</p>}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-y-2 col-span-4">
              <Label>Mật khẩu</Label>
              <Input disabled={isRoute === ''} id="gmail" placeholder="#Adfe8f8jhz!@" {...register('password')} />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
          </div>

          <DialogFooter className="mt-4">
            <SubmitButton text="Lưu thông tin" variant="default" isPending={isPending} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
