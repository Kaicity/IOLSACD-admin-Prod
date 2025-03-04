'use client';

import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SubmitButton } from './components/dashboard/SubmitButton';
import { useForm } from 'react-hook-form';
import { accountFormSchema, type accountFormData } from './schemas/account-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { startTransition, useActionState, useEffect } from 'react';
import { toast } from 'sonner';
import { getUserInfo, login } from './api/auth';
import Cookies from 'js-cookie';
import { redirect, useRouter } from 'next/navigation';
import useAuth from './hooks/useAuth';

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<accountFormData>({
    resolver: zodResolver(accountFormSchema),
  });
  const router = useRouter();

  const [state, submitAction, isPending] = useActionState(async (prevState: any, formData: accountFormData) => {
    try {
      const token = await login(formData);
      if (token) {
        Cookies.set('authToken', token, {
          expires: 1,
          path: '/',
          secure: true,
          sameSite: 'Strict',
        }); // Lưu token vào cookies với thời hạn 1 ngày ah

        //Lưu thông tin người dùng đã đăng nhập
        const data = await getUserInfo();
        Cookies.set('user', JSON.stringify(data), { expires: 1 });

        router.push('/dashboard');
      } else {
        toast.error('Đăng nhập thất bại');
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  }, undefined);

  const onSubmit = (data: accountFormData) => {
    startTransition(() => {
      submitAction(data);
    });
  };

  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      redirect('/dashboard');
    }
  }, [isAuthenticated]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start px-6 py-8 bg-gray-100 rounded-md shadow-lg">
        <Image width={200} height={100} src="/logo.png" alt="Admin Logo" className="w-40 h-auto object-cover mx-auto block" />
        <h1 className="text-2xl font-bold text-primary text-center sm:text-left">Đăng nhập vào hệ thống quản trị</h1>
        <form className="w-full max-w-sm flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <Label className="text-md font-medium text-red-500">*</Label>
              <Label className="text-sm font-medium">Tên đăng nhập</Label>
            </div>
            <Input
              {...register('userName')}
              type="text"
              id="userName"
              className="rounded-lg border border-solid border-black/[.08] p-2.5 text-sm"
              placeholder="Nhập tên đăng nhập"
            />
            {errors.userName && <p className="text-red-500 text-sm">{errors.userName.message}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <Label className="text-md font-medium text-red-500">*</Label>
              <Label className="text-sm font-medium">Mật khẩu</Label>
            </div>
            <Input
              {...register('password')}
              type="password"
              id="password"
              className="rounded-lg border border-solid border-black/[.08] p-2.5 text-sm"
              placeholder="Nhập mật khẩu"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          <SubmitButton text="Đăng nhập" className="w-full" variant="default" isPending={isPending} />
        </form>
      </main>
    </div>
  );
}
