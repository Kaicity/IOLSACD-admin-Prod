'use client';

import { Activity, Ban, Contact, Edit, ExternalLinkIcon, FileText, Pen, Podcast, Settings, Users, Users2 } from 'lucide-react';
import { XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, CartesianGrid, Legend, Line } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import withAuth from '../components/withAuth';
import CountUp from 'react-countup';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Article from '../models/features/arcicle';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { getArticlesRecently } from '../api/article';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { redirect } from 'next/navigation';
import { ViewWebsite } from '../models/features/viewWebsite';
import { getViewWebsites } from '../api/viewWebsite';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Reservation from '../models/features/reservation';
import {
  getAllReservationStatisticByYear,
  getReservationById,
  getReservationTop5Recently,
  updateReservationById,
} from '../api/reservation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  CONSULTATION_TYPES_LABEL,
  STATUS_LABELS,
  STATUS_STYLES,
  type ConsultationType,
  type ReservationStatus,
} from '../enums/reservation';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { EmptyState } from '../components/dashboard/EmptyState';
import ReservationForm from '../components/reservation/reservation-form';
import ConfirmDialog from '../components/dashboard/ConfirmDialog';
import type { ViewConsultingContact } from '../models/features/viewConsultingContact';
import { generateYearChart } from '../utils/generateYear';

const Page = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [reservation, setReservation] = useState<Reservation | null>(null);

  const [viewWebsites, setViewWebsites] = useState<ViewWebsite[]>([]);
  const [viewConsultingContacts, setViewConsultingContacts] = useState<ViewConsultingContact[]>();

  const [yearViewWebsite, setYearViewWebsite] = useState<string>(new Date().getFullYear().toString());
  const [yearConsultingContact, setYearConsultingContact] = useState<string>(new Date().getFullYear().toString());

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [reLoadData, setReLoadData] = useState<boolean>(false);

  const [openConfirm, setOpenConfirm] = useState(false);

  const fetchViewWebsite = async () => {
    try {
      const data = await getViewWebsites(parseInt(yearViewWebsite));

      if (data) {
        setViewWebsites(data);
      }
    } catch (error: any) {
      toast.error(error?.message || 'Mất kết nối với máy chủ, vui lòng đợi phản hồi');
    }
  };

  const fetchReservation = async () => {
    try {
      const data = await getReservationTop5Recently();

      if (data) {
        setReservations(data?.reservations);
      }
    } catch (error: any) {
      toast.error(error?.message || 'Mất kết nối với máy chủ, vui lòng đợi phản hồi');
    }
  };

  const fetchArticlesRecently = async () => {
    try {
      const data = await getArticlesRecently(4);
      if (data) {
        setArticles(data?.articles);
      }
    } catch (error: any) {
      toast.error(error?.message || 'Mất kết nối với máy chủ, vui lòng đợi phản hồi');
    }
  };

  const fetchViewConsultingContact = async () => {
    try {
      const data = await getAllReservationStatisticByYear(parseInt(yearConsultingContact));
      if (data) {
        setViewConsultingContacts(data);
      }
    } catch (error: any) {
      toast.error(error?.message || 'Mất kết nối với máy chủ, vui lòng đợi phản hồi');
    }
  };

  useEffect(() => {
    fetchViewWebsite();
    fetchViewConsultingContact();
    fetchReservation();
    fetchArticlesRecently();
  }, [yearViewWebsite, yearConsultingContact, reLoadData]);

  const handleUpdateReservation = async (id: string) => {
    try {
      const data = await getReservationById(id);
      if (data) {
        setReservation(data);
        setIsDialogOpen(true);
      }
    } catch (error: any) {
      toast.error(error?.message || 'Mất kết nối đến máy chủ, thử lại sau');
    }
  };

  const handleConfirmCancelReservation = async (id: string) => {
    try {
      const requestBody = {
        status: 'CANCELLED',
      };
      const request = await updateReservationById(requestBody, id);
      if (request) {
        toast.success('Cập nhật trạng thái hiển thị thành công');
        setOpenConfirm(false);
        fetchReservation();
      } else {
        toast.error('Cập nhật trạng thái hiển thị thất bại');
      }
    } catch (error: any) {
      toast.error(error?.message || 'Mất kết nối đến máy chủ, thử lại sau');
    }
  };

  return (
    <div className="space-y-6">
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-xl transition-shadow duration-300 shadow-md border-b-4 border-b-yellow-500">
          <CardHeader>
            <CardTitle className="text-sm font-bold text-card-foreground">Lượt xem</CardTitle>
            <CardDescription>Chỉ số lượt xem theo ngày</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="p-2 w-10 h-10 bg-yellow-500/10 rounded-md">
                <Activity className="w-6 h-6 text-yellow-500" />
              </div>
              <span className="text-2xl font-bold">
                <CountUp start={0} end={1234} duration={2} separator="," />
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-shadow duration-300 shadow-md border-b-4 border-b-blue-500">
          <CardHeader>
            <CardTitle className="text-sm font-bold text-card-foreground">Tổng lịch tư vấn</CardTitle>
            <CardDescription>Số lượng lịch tư vấn hôm nay</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="p-2 w-10 h-10 bg-primary/10 rounded-md">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <span className="text-2xl font-bold">
                <CountUp start={0} end={120} duration={2} separator="," />
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-shadow duration-300 shadow-md border-b-4 border-b-green-500">
          <CardHeader>
            <CardTitle className="text-sm font-bold text-card-foreground">Tổng lịch liên hệ</CardTitle>
            <CardDescription>Số lượng liên hệ hôm nay</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="p-2 w-10 h-10 bg-green-500/10 rounded-md">
                <Podcast className="w-6 h-6 text-green-500" />
              </div>
              <span className="text-2xl font-bold">
                <CountUp start={0} end={45} duration={2} separator="," />
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-shadow duration-300 shadow-md border-b-4 border-b-red-500">
          <CardHeader>
            <CardTitle className="text-sm font-bold text-card-foreground">Tổng số liên hệ - tư vấn đang chờ</CardTitle>
            <CardDescription>Số lượng liên hệ - tư vấn đang chờ xử lý</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="p-2 w-10 h-10 bg-red-500/10 rounded-md">
                <Users className="w-6 h-6 text-red-500" />
              </div>
              <span className="text-2xl font-bold">
                <CountUp start={0} end={56} duration={2} separator="," />
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Biểu đồ thống kê số lượt xem trang web */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Thống kê số lượt xem trang web</CardTitle>
            <CardDescription>
              <Select
                defaultValue={new Date().getFullYear().toString()}
                onValueChange={(value) => {
                  setYearViewWebsite(value);
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Chọn năm" />
                </SelectTrigger>
                <SelectContent>
                  {generateYearChart().map((y) => (
                    <SelectItem key={y} value={y}>
                      Năm / {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart width={730} height={250} data={viewWebsites} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="dateName" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="view" stroke="#8884d8" name="Lượt xem" />
                </LineChart>
              </ResponsiveContainer>
              <Label className="text-muted-foreground text-sm flex justify-center">
                {'('}Biểu diễn biểu đồ theo tháng từ Tháng 1 - Tháng 12{')'}
              </Label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Thống kê số lịch tư vấn - liên hệ</CardTitle>
            <CardDescription>
              <Select
                defaultValue={new Date().getFullYear().toString()}
                onValueChange={(value) => {
                  setYearConsultingContact(value);
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Chọn năm" />
                </SelectTrigger>
                <SelectContent>
                  {generateYearChart().map((y) => (
                    <SelectItem key={y} value={y}>
                      Năm / {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  width={730}
                  height={250}
                  data={viewConsultingContacts}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="dateName" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="quantityConsult" stroke="#8884d8" name="Tư Vấn" />
                  <Line type="monotone" dataKey="quantityContact" stroke="#82ca9d" name="Liên Hệ" />
                </LineChart>
              </ResponsiveContainer>
              <Label className="text-muted-foreground text-sm flex justify-center">
                {'('}Biểu diễn biểu đồ theo tháng từ Tháng 1 - Tháng 12{')'}
              </Label>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Lịch tư vấn - liên hệ gần đây</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {reservations?.length === 0 ? (
            <EmptyState
              title="Chưa có lịch tư vấn - liên hệ nào"
              description="Có thể tạo lịch tư vấn hoặc liên hệ mới bằng cách ấn vào nút tạo dưới đây"
              buttonText="Tạo mới"
              href="/dashboard/consulting-schedule/consulting"
            />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {reservations.map((reservation) => {
                const status = reservation?.status;
                const statusLabel = STATUS_LABELS[status as ReservationStatus] || 'Không xác định';
                const statusStyle = STATUS_STYLES[status as ReservationStatus] || 'bg-gray-100 text-gray-500';

                return (
                  <div className="overflow-hidden shadow rounded-lg border relative" key={reservation.id + reservation.fullName}>
                    <div className="absolute top-2 right-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="icon">
                            <Settings className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Sự kiện</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuGroup>
                            <DropdownMenuItem asChild>
                              <Link href={`/dashboard/consulting-schedule/consulting`}>
                                <ExternalLinkIcon className="mr-2 size-4" />
                                Tư vấn ngay
                              </Link>
                            </DropdownMenuItem>
                            {/* <CopyLinkMenuItem meetingUrl={`${process.env.NEXT_PUBLIC_URL}/${data.username}/${reservation.url}`} /> */}
                            <DropdownMenuItem className="text-red-500" onClick={() => setOpenConfirm(true)}>
                              <Ban className="mr-2 size-4" />
                              Hủy sự kiện
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <Link href="/" className="flex items-center p-5">
                      <div className="flex-shrink-0 p-2 bg-primary/20 text-primary rounded-md">
                        <Contact className="size-6" />
                      </div>

                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dd className="text-lg font-medium">{reservation?.fullName.toUpperCase()}</dd>
                          <dt className="text-md font-medium text-muted-foreground">
                            {CONSULTATION_TYPES_LABEL[reservation?.type as ConsultationType]}
                          </dt>

                          <dt className="text-sm font-medium text-muted-foreground mt-1">
                            <Badge variant="outline" className={cn('flex items-center px-2 py-1 rounded-md w-max', statusStyle)}>
                              {statusLabel}
                            </Badge>
                          </dt>
                        </dl>
                      </div>
                    </Link>
                    <div className="bg-muted px-5 py-3 flex items-center justify-end">
                      <Button onClick={() => handleUpdateReservation(reservation?.id)}>
                        <Edit />
                        Chỉnh sửa
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Hoạt động gần đây</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {articles?.length === 0 ? (
            <EmptyState
              title="Bạn chưa có bài viết nào gần đây"
              description="Bạn có thể tạo bài viết mới bằng cách ấn vào nút tạo dưới đây"
              buttonText="Tạo bài viết"
              href="/dashboard/generate-post/service"
            />
          ) : (
            <>
              {articles.map((article) => (
                <div
                  key={article?.id}
                  className="flex items-center space-x-4 p-3 bg-muted rounded-lg hover:bg-accent transition hover:shadow-lg cursor-pointer"
                  onClick={() => {
                    redirect(`/dashboard/detail-post/${article?.id}`);
                  }}
                >
                  <Image src={article?.preview_img} alt={article?.title} width={100} height={100} className="rounded-md" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{article.title}</p>
                    <p className="text-xs text-gray-500">
                      {formatDistanceToNow(article?.createDate, { addSuffix: true, locale: vi })}
                    </p>
                  </div>
                </div>
              ))}
            </>
          )}
        </CardContent>
      </Card>

      <ReservationForm
        mode={'UPDATE'}
        reservation={reservation!}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        reloadData={() => setReLoadData((prev) => !prev)}
      />

      <ConfirmDialog
        title="Bạn có chắn hủy sự kiện này ?"
        openConfirm={openConfirm}
        setOpenConfirm={() => setOpenConfirm(false)}
        btnConfirm={() => handleConfirmCancelReservation(reservation?.id as string)}
      />
    </div>
  );
};

export default withAuth(Page);
