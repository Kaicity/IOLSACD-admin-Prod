import { createReservation, updateReservationById } from '@/app/api/reservation';
import { RESERVATION_STATUS_OPTIONS, RESERVATION_TYPE_OPTIONS } from '@/app/constants/reservationOptions';
import type Reservation from '@/app/models/features/reservation';
import { reservationFormSchema, type ReservationFormData } from '@/app/schemas/reservation-schema';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { UploadDropzone } from '@/lib/uploadthing';
import { zodResolver } from '@hookform/resolvers/zod';
import { startTransition, useActionState, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { SubmitButton } from '../dashboard/SubmitButton';
import { Download, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/datepicker';
import { format } from 'date-fns';

export default function ReservationForm({
  mode,
  reservation,
  isDialogOpen,
  setIsDialogOpen,
  reloadData,
}: { reservation: Reservation } & {
  mode: string;
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
  reloadData: () => void;
}) {
  const [currentFileUrl, setCurrentFileUrl] = useState('');
  const [nameFileLabel, setNameFileLabel] = useState('');

  const [consultDate, setConsultDate] = useState<Date | null>(null);

  const handleDeleteFile = () => {
    setCurrentFileUrl('');
  };

  const {
    register,
    setValue,
    trigger,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationFormSchema),
    defaultValues: {
      fullName: '',
      address: '',
      consultDate: '',
      content: '',
      file: '',
      gmail: '',
      phone: '',
      status: '',
      subject: '',
    },
  });

  const [state, submitAction, isPending] = useActionState(async (prevState: any, formData: ReservationFormData) => {
    try {
      if (mode === 'CREATE') {
        console.log(formData);

        const request = await createReservation(formData);
        if (request) {
          toast.success('Tạo lịch tư vấn thành công!');
          reset({
            fullName: '',
            address: '',
            consultDate: '',
            content: '',
            file: '',
            gmail: '',
            phone: '',
            status: '',
            subject: '',
          });
          setIsDialogOpen(false);
          reloadData?.();
        } else {
          toast.error('Tạo lịch tư vấn thất bại!');
        }
      } else {
        const request = await updateReservationById(formData, reservation?.id);
        if (request) {
          toast.success('Cập nhật lịch tư vấn thành công!');
          reset({
            fullName: '',
            address: '',
            consultDate: '',
            content: '',
            file: '',
            gmail: '',
            phone: '',
            status: '',
            subject: '',
          });
          setIsDialogOpen(false);
          reloadData?.();
        } else {
          toast.error('Cập nhật lịch tư vấn thất bại!');
        }
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  }, undefined);

  const onSubmit = (data: ReservationFormData) => {
    startTransition(() => {
      submitAction(data);
    });
  };

  const handleConsultDateChange = (date: Date | undefined) => {
    setConsultDate(date as Date);
    setValue('consultDate', date?.toISOString().split('T')[0] as string);
    console.log('Selected Date:', date);
  };

  useEffect(() => {
    if (mode === 'UPDATE' && reservation) {
      setCurrentFileUrl(reservation?.file);
      reset(reservation);
    } else {
      setCurrentFileUrl('');
      reset({
        fullName: '',
        address: '',
        consultDate: RESERVATION_STATUS_OPTIONS[0].value,
        content: '',
        file: '',
        gmail: '',
        phone: '',
        status: '',
        subject: '',
      });
    }

    if (consultDate) {
      setValue('consultDate', format(consultDate, 'dd-MM-yyyy'));
    }
  }, [mode, reservation, reset, consultDate]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="max-w-full max-h-[700px] md:max-w-[725px] md:max-h-[500px] lg:max-w-[925px] lg:max-h-[800px] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-primary">{mode === 'CREATE' ? 'Tạo lịch tư vấn' : 'Cập nhật thông tin'}</DialogTitle>
          <DialogDescription>
            {mode === 'CREATE' ? 'Điền các thông tin tư vấn' : 'Cập nhật các thông tin tư vấn'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center gap-4">
            <div className="flex flex-col gap-y-2 col-span-4 lg:col-span-1">
              <Label>Ngày tư vấn</Label>
              <DatePicker
                onDateChange={handleConsultDateChange}
                startYear={1900}
                dateValue={consultDate as Date}
                endYear={new Date().getFullYear()}
              />
              {errors.consultDate && <p className="text-red-500 text-sm">{errors.consultDate.message}</p>}
            </div>

            <div className="flex flex-col gap-y-2 col-span-4 lg:col-span-3"></div>

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

            {/* Address */}
            <div className="flex flex-col gap-y-2 col-span-4 lg:col-span-4">
              <Label>Địa chỉ</Label>
              <Input id="address" placeholder="Địa chỉ thường trú" {...register('address')} />
              {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-y-2 col-span-4 lg:col-span-2">
              <Label>Email</Label>
              <Input id="gmail" placeholder="nguyenvana@gmail.com" {...register('gmail')} />
              {errors.gmail && <p className="text-red-500 text-sm">{errors.gmail.message}</p>}
            </div>

            {/* Type */}
            <div className="flex flex-col gap-y-2 col-span-4 lg:col-span-2">
              <Label>Hình thức tư vấn</Label>
              <Select
                defaultValue={reservation?.type}
                onValueChange={(value) => {
                  setValue('type', value);
                  trigger('type');
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn hình thức tư vấn" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {RESERVATION_TYPE_OPTIONS.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-y-2 col-span-4 lg:col-span-2">
              <Label>Vấn đề tư vấn</Label>
              <Input id="subject" placeholder="Tư vấn về vấn đề.." {...register('subject')} />
              {errors.subject && <p className="text-red-500 text-sm">{errors.subject.message}</p>}
            </div>

            {/* Type */}
            <div className="flex flex-col gap-y-2 col-span-4 lg:col-span-2">
              <Label>Trạng thái</Label>
              <Select
                defaultValue={reservation?.status}
                onValueChange={(value) => {
                  setValue('status', value);
                  trigger('status');
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn trạng thái tư vấn" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {RESERVATION_STATUS_OPTIONS.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
            </div>

            {/* Mo Ta */}
            <div className="flex flex-col gap-y-2 col-span-4">
              <Label>Nội dung</Label>
              <Textarea id="content" placeholder="Nhập nội dung.." {...register('content')} className="min-h-[120px]" />
              {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex flex-col gap-y-2 relative mt-4">
            <Label className="mb-2">Tải tệp đính kèm</Label>
            <Input
              id="imgPath"
              {...register('file')}
              value={currentFileUrl}
              onChange={(e) => setValue('file', e.target.value)}
              className="sr-only"
            />
            {currentFileUrl ? (
              <div className="relative w-max">
                <div className="flex items-center gap-2">
                  <a href={currentFileUrl} download className="flex items-center gap-2 text-blue-600 hover:underline">
                    <Download className="h-4 w-4" />
                    {nameFileLabel || 'Chưa có file upload'}{' '}
                  </a>
                  <Button
                    onClick={handleDeleteFile}
                    variant="destructive"
                    className="w-2 h-7 -top-3 -right-2 rounded-full"
                    type="button"
                  >
                    <X className="w-4 h-4"></X>
                  </Button>
                </div>
              </div>
            ) : (
              <UploadDropzone
                onClientUploadComplete={(res) => {
                  const url = res[0].url;
                  const name = res[0].name;
                  setNameFileLabel(name);
                  setCurrentFileUrl(url);
                  setValue('file', url); // Cập nhật vào form
                  toast.success('File của bạn đã được upload');
                }}
                onUploadError={(error) => {
                  console.log('Đã có lỗi xảy ra khi upload file', error);
                  toast.error(error.message);
                }}
                endpoint="fileUploader"
              />
            )}
            {errors.file && <p className="text-red-500 text-sm">{errors.file.message}</p>}
          </div>

          <DialogFooter className="mt-4">
            <SubmitButton text="Lưu thông tin" variant="default" isPending={isPending} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
