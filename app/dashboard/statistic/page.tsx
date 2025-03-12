'use client';

import { getAllArticleStatisticByYear } from '@/app/api/article';
import { getAllHumanResourceStatisticByYear } from '@/app/api/human-resource';
import { getAllReservationStatisticByYear } from '@/app/api/reservation';
import { getViewWebsites } from '@/app/api/viewWebsite';
import { DataTable } from '@/app/components/dashboard/DataTable';
import HeaderContent from '@/app/components/dashboard/HeaderContent';
import withAuth from '@/app/components/withAuth';
import { REPORT_OPTION } from '@/app/constants/reportOption';
import type { ViewArticle } from '@/app/models/features/viewArticle';
import type { ViewConsultingContact } from '@/app/models/features/viewConsultingContact';
import type { ViewMember } from '@/app/models/features/viewMember';
import type { ViewWebsite } from '@/app/models/features/viewWebsite';
import { generateYearChart } from '@/app/utils/generateYear';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tooltip } from '@/components/ui/tooltip';
import type { ColumnDef } from '@tanstack/react-table';
import { Ban, LoaderIcon, RotateCcwIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { toast } from 'sonner';

function StatisticPage() {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  const [viewWebsites, setViewWebsites] = useState<ViewWebsite[]>([]);
  const [viewConsultingContacts, setViewConsultingContacts] = useState<ViewConsultingContact[]>([]);
  const [viewMembers, setViewMembers] = useState<ViewMember[]>([]);
  const [viewArticles, setViewArticles] = useState<ViewArticle[]>([]);

  const [showTable, setShowTable] = useState<boolean>(true);
  const [showChart, setShowChart] = useState<boolean>(true);

  const [loading, setLoading] = useState(false);

  //Select year
  const [year, setYear] = useState<string>(new Date().getFullYear().toString());

  const handleReset = () => {
    setViewArticles([]);
    setViewConsultingContacts([]);
    setViewMembers([]);
    setViewWebsites([]);
    setSelectedReport('');
    setYear(new Date().getFullYear().toString());
  };

  // Colunm Table View Website
  const columnsViewWebsite: ColumnDef<ViewWebsite>[] = [
    {
      accessorKey: 'dateName',
      header: 'THÁNG',
      cell: ({ row }) => {
        const name = row.getValue('dateName') as string;
        return <span className="font-medium">{name?.toUpperCase()}</span>;
      },
    },
    {
      accessorKey: 'view',
      header: 'LƯỢT XEM',
      cell: ({ row }) => {
        const view = row.getValue('view') as string;
        return <span className="font-medium">{view}</span>;
      },
    },
  ];

  // Colunm Table View consultation and contact
  const columnViewConsultingContact: ColumnDef<ViewConsultingContact>[] = [
    {
      accessorKey: 'dateName',
      header: 'THÁNG',
      cell: ({ row }) => {
        const name = row.getValue('dateName') as string;
        return <span className="font-medium">{name?.toUpperCase()}</span>;
      },
    },
    {
      header: 'LƯỢT XEM',
      accessorFn: (row) => row.quantity,
      cell: ({ getValue }) => {
        const quantity = getValue() as { consultations: number; contacts: number };
        return (
          <div className="flex flex-col gap-1 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-blue-600 font-semibold">
                <i className="fas fa-user-md"></i> Tư vấn:
              </span>
              <span className="font-medium text-gray-800">{quantity.consultations}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600 font-semibold">
                <i className="fas fa-phone-alt"></i> Liên hệ:
              </span>
              <span className="font-medium text-gray-800">{quantity.contacts}</span>
            </div>
          </div>
        );
      },
    },
  ];

  // Colunm Table View Website
  const columnsViewMember: ColumnDef<ViewMember>[] = [
    {
      accessorKey: 'dateName',
      header: 'THÁNG',
      cell: ({ row }) => {
        const name = row.getValue('dateName') as string;
        return <span className="font-medium">{name?.toUpperCase()}</span>;
      },
    },
    {
      accessorKey: 'quantity',
      header: 'SỐ LƯỢNG',
      cell: ({ row }) => {
        const quantity = row.getValue('quantity') as string;
        return <span className="font-medium">{quantity}</span>;
      },
    },
  ];

  // Colunm Table View consultation and contact
  const columnViewArticle: ColumnDef<ViewArticle>[] = [
    {
      accessorKey: 'dateName',
      header: 'THÁNG',
      cell: ({ row }) => {
        const name = row.getValue('dateName') as string;
        return <span className="font-medium">{name?.toUpperCase()}</span>;
      },
    },
    {
      header: 'LƯỢT XEM',
      accessorFn: (row) => row.quantity,
      cell: ({ getValue }) => {
        const quantity = getValue() as { news: number; knowledge: number; service: number };
        return (
          <div className="flex flex-col gap-1 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-blue-600 font-semibold">
                <i className="fas fa-user-md"></i> Tin tức:
              </span>
              <span className="font-medium text-gray-800">{quantity.news}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600 font-semibold">
                <i className="fas fa-phone-alt"></i> Kiến thức:
              </span>
              <span className="font-medium text-gray-800">{quantity.knowledge}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-orange-500 font-semibold">
                <i className="fas fa-phone-alt"></i> Dịch vụ:
              </span>
              <span className="font-medium text-gray-800">{quantity.service}</span>
            </div>
          </div>
        );
      },
    },
  ];

  const getChartConfig = () => {
    switch (selectedReport) {
      case 'VIEW_WEBSITE':
        return {
          title: 'Biểu đồ Lượt xem trang web',
          data: viewWebsites,
          lines: [{ key: 'view', color: '#8884d8', label: 'Lượt xem' }],
        };

      case 'VIEW_CONSULTING_CONTACT':
        return {
          title: 'Biểu đồ Lượt liên hệ tư vấn',
          data: viewConsultingContacts,
          lines: [
            { key: 'quantity.consultations', color: '#82ca9d', label: 'Tư vấn' },
            { key: 'quantity.contacts', color: '#ff7300', label: 'Liên hệ' },
          ],
        };

      case 'VIEW_MEMBER':
        return {
          title: 'Biểu đồ Thống kê thành viên',
          data: viewMembers,
          lines: [{ key: 'quantity', color: '#8884d8', label: 'Tham gia' }],
        };

      case 'VIEW_ARTICLE':
        return {
          title: 'Biểu đồ Lượt xem bài viết',
          data: viewArticles,
          lines: [
            { key: 'quantity.news', color: '#82ca9d', label: 'Tin tức' },
            { key: 'quantity.knowledge', color: '#ff7300', label: 'Kiến thức' },
            { key: 'quantity.service', color: '#4169E1', label: 'Dịch vụ' },
          ],
        };

      default:
        return { title: '', data: [], lines: [] };
    }
  };

  const { title, data: chartData, lines: chartLines } = getChartConfig();

  const fetchReportData = async () => {
    if (!selectedReport) {
      toast.error('Vui lòng chọn loại báo cáo trước khi chạy');
      return;
    }

    setLoading(true);

    setTimeout(async () => {
      try {
        switch (selectedReport) {
          case 'VIEW_WEBSITE':
            const websiteData = await getViewWebsites(parseInt(year));
            setViewWebsites(websiteData || []);
            break;

          case 'VIEW_CONSULTING_CONTACT':
            const consultingData = await getAllReservationStatisticByYear(parseInt(year));
            setViewConsultingContacts(consultingData || []);
            break;

          case 'VIEW_MEMBER':
            const memberData = await getAllHumanResourceStatisticByYear(parseInt(year));
            setViewMembers(memberData || []);
            break;

          case 'VIEW_ARTICLE':
            const articleData = await getAllArticleStatisticByYear(parseInt(year));
            setViewArticles(articleData || []);
            break;

          default:
            toast.error('Loại báo cáo không hợp lệ');
            break;
        }
      } catch (error: any) {
        toast.error(error?.message || 'Mất kết nối với máy chủ, vui lòng thử lại sau');
      } finally {
        setLoading(false); // Kết thúc loading
      }
    }, 1500); // Giả lập thời gian tải 1.5 giây
  };

  return (
    <div>
      <HeaderContent title="Báo cáo thống kê" subTitle="Biểu đồ báo cáo thống kê hằng năm" />
      <Card className="px-4 py-2 shadow-md">
        <CardHeader>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {/* Chọn loại báo cáo */}
            <div className="space-y-2 col-span-5 md:col-span-2 lg:col-span-1">
              <Label>Chọn loại báo cáo</Label>
              <Select value={selectedReport || ''} onValueChange={(value) => setSelectedReport(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn loại báo cáo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {REPORT_OPTION.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Chọn năm */}
            <div className="space-y-2 col-span-5 md:col-span-2 lg:col-span-1">
              <Label>Chọn năm</Label>
              <Select value={year} onValueChange={(value) => setYear(value)}>
                <SelectTrigger>
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
            </div>

            {/* Chọn hiển thị */}
            <div className="space-y-2 col-span-5">
              <Label>Chọn hiển thị</Label>
              <div className="flex items-center gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox checked={showTable} onCheckedChange={() => setShowTable(!showTable)} />
                  <Label className="text-sm text-muted-foreground">Bảng</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox checked={showChart} onCheckedChange={() => setShowChart(!showChart)} />
                  <Label className="text-sm text-muted-foreground">Biểu đồ</Label>
                </div>
              </div>
            </div>

            {/* Nút chạy báo cáo */}
            <div className="space-y-2 col-span-5">
              <div className="flex items-center gap-2">
                <Button onClick={fetchReportData} disabled={loading}>
                  {loading ? <LoaderIcon className="w-4 h-4 animate-spin" /> : 'Chạy báo cáo'}
                </Button>

                <Button variant="link" className="ring-1 ring-green-500 text-green-500">
                  Xuất Excel
                </Button>
                <Button variant={'outline'} className="" onClick={handleReset}>
                  <RotateCcwIcon className="w-6 h-6" />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Separator />
          <div className="flex gap-4 mt-6">
            {/* Bảng */}
            {showTable && (
              <div className="flex-1 overflow-auto">
                {selectedReport === 'VIEW_WEBSITE' && (
                  <DataTable
                    columns={columnsViewWebsite}
                    data={viewWebsites}
                    page={0}
                    total={0}
                    limit={0}
                    onPageChange={() => {}}
                    onLimitChange={() => {}}
                  />
                )}

                {selectedReport === 'VIEW_CONSULTING_CONTACT' && (
                  <DataTable
                    columns={columnViewConsultingContact}
                    data={viewConsultingContacts}
                    page={0}
                    total={0}
                    limit={0}
                    onPageChange={() => {}}
                    onLimitChange={() => {}}
                  />
                )}

                {selectedReport === 'VIEW_MEMBER' && (
                  <DataTable
                    columns={columnsViewMember}
                    data={viewMembers}
                    page={0}
                    total={0}
                    limit={0}
                    onPageChange={() => {}}
                    onLimitChange={() => {}}
                  />
                )}

                {selectedReport === 'VIEW_ARTICLE' && (
                  <DataTable
                    columns={columnViewArticle}
                    data={viewArticles}
                    page={0}
                    total={0}
                    limit={0}
                    onPageChange={() => {}}
                    onLimitChange={() => {}}
                  />
                )}
              </div>
            )}

            {/* Biểu đồ */}
            {showChart && (
              <div className="flex-1 h-80 flex flex-col items-center justify-center border border-gray-300 rounded-lg">
                {chartData.length > 0 ? (
                  <>
                    <h3 className="text-lg font-semibold text-center">{title}</h3>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart width={730} height={250} data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="dateName" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {chartLines.map((line, index) => (
                          <Line key={index} type="monotone" dataKey={line.key} stroke={line.color} name={line.label} />
                        ))}
                      </LineChart>
                    </ResponsiveContainer>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full opacity-50">
                    <Ban className="h-6 w-6" />
                    <p className="text-gray-500 mt-2">Chưa có dữ liệu</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default withAuth(StatisticPage);
