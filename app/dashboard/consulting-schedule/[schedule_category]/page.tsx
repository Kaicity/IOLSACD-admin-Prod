'use client';

import { deleteReservationById, getReservation, getReservationById } from '@/app/api/reservation';
import { DataTable } from '@/app/components/dashboard/DataTable';
import HeaderContent from '@/app/components/dashboard/HeaderContent';
import ReservationForm from '@/app/components/reservation/reservation-form';
import withAuth from '@/app/components/withAuth';
import { RESERVATION_TYPE_OPTIONS } from '@/app/constants/reservationOptions';
import {
  CONSULTATION_TYPES_LABEL,
  STATUS_LABELS,
  STATUS_STYLES,
  type ConsultationType,
  type ReservationStatus,
} from '@/app/enums/reservation';
import type Reservation from '@/app/models/features/reservation';
import { formatDate } from '@/app/utils/formatDateUTC';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DatePicker } from '@/components/ui/datepicker';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import type { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Download, EllipsisVertical, Mail, PhoneCall, PlusCircle, RotateCcwIcon, SquareArrowRight, Trash } from 'lucide-react';
import { notFound, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

type btnActions = 'CREATE' | 'UPDATE' | 'SEE' | 'PRINT' | 'NULL';

function ConsultingSchedule() {
  const params = useParams();

  const validCategories = ['consultation', 'contact'];

  if (!validCategories.includes(params?.schedule_category as string)) {
    notFound();
  }

  const [searchValue, setSearchValue] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState(params?.schedule_category?.toString().toUpperCase());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [reLoadData, setReLoadData] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);

  const [actions, setActions] = useState<btnActions>('CREATE');
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const scheduleType = () => {
    let headerContent;
    switch (params?.schedule_category) {
      case 'consultation':
        headerContent = {
          title: 'Tư vấn',
          subTitle: 'Quản lý thông tin tư vấn',
        };
        return headerContent;

      case 'contact':
        headerContent = {
          title: 'Liên hệ',
          subTitle: 'Quản lý thông tin liên hệ',
        };
        return headerContent;

      default:
        console.error('Not found value');
        break;
    }
  };

  const fetchReservation = async () => {
    try {
      const response = await getReservation(page, limit, total, {
        query: searchValue,
        type: typeFilter,
        startDate: startDate ? formatDate(startDate) : '',
        endDate: endDate ? formatDate(endDate) : '',
      });

      setReservations(response.reservations);
      setTotal(response.pagination.total);
      setLimit(response.pagination.limit);
    } catch (error) {
      console.error('Error fetching human resource:', error);
    }
  };

  useEffect(() => {
    fetchReservation();
  }, [page, limit, searchValue, typeFilter, reLoadData, startDate, endDate]);

  const handleUpdate = async (resource: Reservation) => {
    setActions('UPDATE');
    setIsDialogOpen(true);
    setReservation(resource);
  };

  const handleDelete = async (resource: Reservation) => {
    try {
      const request = await deleteReservationById(resource.id);

      if (request) {
        toast.success('Đã xóa đặt lịch thành công');
        fetchReservation();
      } else {
        toast.error('Xóa đặt lịch thất bại');
      }
    } catch (error: any) {
      toast.error(error?.message || 'Mất kết nối với máy chủ, vui lòng đợi phản hồi');
    }
  };

  const handleCreate = () => {
    setActions('CREATE');
    setIsDialogOpen(true);
    setReservation(null);
  };

  const handleStartDateChange = (date: Date | undefined) => {
    setStartDate(date as Date);
    // console.log('Selected Date:', date);
  };

  const handleSEndDateChange = (date: Date | undefined) => {
    setEndDate(date as Date);
    // console.log('Selected Date:', date);
  };

  // Colunm Table
  const columns: ColumnDef<Reservation>[] = [
    {
      accessorKey: 'fullName',
      header: 'HỌ VÀ TÊN',
      cell: ({ row }) => {
        const fullName = row.getValue('fullName') as string;
        return <span className="font-medium">{fullName?.toUpperCase()}</span>;
      },
    },
    {
      accessorKey: 'gmail',
      header: 'GMAIL',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-orange-600 font-bold" />
          <span className="font-medium text-muted-foreground">{row.getValue('gmail')}</span>
        </div>
      ),
    },
    {
      accessorKey: 'phone',
      header: 'SỐ ĐIỆN THOẠI',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <PhoneCall className="h-4 w-4 text-green-600 font-bold animate-bounce" />
          <span className="font-medium text-muted-foreground">{row.getValue('phone')}</span>
        </div>
      ),
    },
    {
      accessorKey: 'type',
      header: 'HÌNH THỨC',
      cell: ({ row }) => {
        const type = row.getValue('type') as ConsultationType;
        const typeLabel = CONSULTATION_TYPES_LABEL[type] || 'Không xác định';
        return (
          <Badge variant="outline" className={cn('flex items-center px-2 py-1 rounded-md w-max')}>
            {typeLabel}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'consultDate',
      header: 'NGÀY TƯ VẤN',
      cell: ({ row }) => {
        const date = row.getValue('consultDate') as string;
        return <span>{format(date, 'dd-MM-yyyy')}</span>;
      },
    },
    {
      accessorKey: 'file',
      header: 'ĐÍNH KÈM',
      cell: ({ row }) => {
        const fileUrl = row.getValue('file') as string;
        return fileUrl ? (
          <a href={fileUrl} download className="flex items-center gap-2 text-blue-600 hover:underline">
            <Download className="h-4 w-4" />
            Tải xuống
          </a>
        ) : (
          <span className="text-gray-400">Không có tệp</span>
        );
      },
    },
    {
      accessorKey: 'status',
      header: 'TRẠNG THÁI',
      cell: ({ row }) => {
        const status = row.getValue('status') as ReservationStatus;
        const statusLabel = STATUS_LABELS[status] || 'Không xác định';
        const statusStyle = STATUS_STYLES[status] || 'bg-gray-100 text-gray-500';

        return (
          <Badge variant="outline" className={cn('flex items-center px-2 py-1 rounded-md w-max', statusStyle)}>
            {statusLabel}
          </Badge>
        );
      },
    },
    {
      id: 'actions',
      header: 'Hành động',
      cell: ({ row }) => {
        const resource = row.original;

        return (
          <div className="justify-center flex">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <EllipsisVertical className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent side="bottom" align="end">
                <DropdownMenuItem onClick={() => handleUpdate(resource)}>
                  <SquareArrowRight />
                  Tiếp nhận thông tin
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDelete(resource)}>
                  <Trash />
                  Xóa
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  return (
    <div className="">
      <HeaderContent title={scheduleType()?.title as string} subTitle={scheduleType()?.subTitle as string} />

      <Card className="px-4 py-2 shadow-md">
        {/* Search Input */}
        <div className="flex flex-wrap items-center gap-2 py-4">
          <Input
            placeholder="Tìm kiếm theo tên.."
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            className="max-w-sm sm:w-full"
          />

          {/* Filter type */}
          {/* <Select
            value={typeFilter}
            onValueChange={(value) => {
              setTypeFilter(value);
            }}
          >
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Lọc theo loại" />
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
          </Select> */}

          <div className="w-full lg:w-[250px] lg:ml-4">
            <div className="flex items-center gap-2">
              <Label className="whitespace-nowrap text-primary">Từ ngày /</Label>
              <DatePicker
                onDateChange={handleStartDateChange}
                startYear={1900}
                dateValue={startDate as Date}
                endYear={new Date().getFullYear()}
              />
            </div>
          </div>

          <div className="w-full lg:w-[250px] lg:ml-4">
            <div className="flex items-center gap-2">
              <Label className="whitespace-nowrap text-primary">Đến ngày /</Label>
              <DatePicker
                onDateChange={handleSEndDateChange}
                startYear={1900}
                dateValue={endDate as Date}
                endYear={new Date().getFullYear()}
              />
            </div>
          </div>

          <Button
            variant="outline"
            onClick={() => {
              setSearchValue('');
              setStartDate(null);
              setEndDate(null);
              setPage(1);
            }}
          >
            <RotateCcwIcon className="w-6 h-6" />
          </Button>

          <div className="ml-auto">
            <Button variant="default" className="w-full sm:w-auto" onClick={handleCreate}>
              <PlusCircle className="w-6 h-6" />
              Tạo
            </Button>

            <ReservationForm
              mode={actions}
              reservation={reservation!}
              isDialogOpen={isDialogOpen}
              setIsDialogOpen={setIsDialogOpen}
              reloadData={() => setReLoadData((prev) => !prev)}
            />
          </div>
        </div>

        <Separator className="mt-3 mb-6 text-muted-foreground" />

        {/* Data Table */}
        <DataTable
          columns={columns}
          data={reservations}
          page={page}
          total={total}
          limit={limit}
          onPageChange={setPage}
          onLimitChange={setLimit}
        />
      </Card>
    </div>
  );
}

export default withAuth(ConsultingSchedule);
