'use client';

import { DataTable } from '@/app/components/dashboard/DataTable';
import HeaderContent from '@/app/components/dashboard/HeaderContent';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { ColumnDef } from '@tanstack/react-table';
import { Edit, EllipsisVertical, EyeIcon, Mail, PhoneCall, PlusCircle, RotateCcwIcon, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import HumanResourceForm from '../../components/human-resource/human-resoure-form';
import type HumanResource from '@/app/models/features/human-resource';
import withAuth from '@/app/components/withAuth';
import { deleteHumanResourceById, getHumanResource } from '@/app/api/human-resource';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { HUMAN_RESOURCE_ROLE_STYLES, HUMAN_RESOURCE_ROLES_LABEL, type HumanResourceRole } from '@/app/enums/human-resource.enum';
import { cn } from '@/lib/utils';
import { HUMAN_RESOURCE_OPTIONS } from '@/app/constants/humanResourceOption';
import { toast } from 'sonner';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';

type btnActions = 'CREATE' | 'UPDATE' | 'SEE' | 'PRINT' | 'NULL';

function HumanResourcePage() {
  const [searchValue, setSearchValue] = useState<string>('');
  const [roleFilter, setRoleFilter] = useState('');
  const [isShowFilter, setIsShowFilter] = useState<boolean>(true);
  const [humanResources, setHumanResources] = useState<HumanResource[]>([]);
  const [humanResource, setHumanResource] = useState<HumanResource | null>(null);
  const [reLoadData, setReLoadData] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);

  const [actions, setActions] = useState<btnActions>('CREATE');
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const fetchHumanResource = async () => {
    try {
      const response = await getHumanResource(page, limit, total, {
        query: searchValue,
        role: roleFilter,
        isShow: isShowFilter,
      });

      setHumanResources(response.members);
      setTotal(response.pagination.total);
    } catch (error) {
      console.error('Error fetching human resource:', error);
    }
  };

  useEffect(() => {
    fetchHumanResource();
  }, [page, limit, searchValue, roleFilter, isShowFilter, reLoadData]);

  const handleUpdate = (resource: HumanResource) => {
    setActions('UPDATE');
    setIsDialogOpen(true);
    setHumanResource(resource);
  };

  const handleDelete = async (resource: HumanResource) => {
    try {
      const request = await deleteHumanResourceById(resource.id);

      if (request) {
        toast.success('Đã xóa nhân sự thành công');
        fetchHumanResource();
      } else {
        toast.error('Xóa nhân sự thất bại');
      }
    } catch (error) {}
  };

  const handleCreate = () => {
    setActions('CREATE');
    setIsDialogOpen(true);
    setHumanResource(null);
  };

  // Colunm Table
  const columns: ColumnDef<HumanResource>[] = [
    {
      accessorKey: 'imgUrl',
      header: 'ẢNH ĐẠI DIỆN',
      cell: ({ row }) => {
        const name = row.getValue('fullName') as string;
        return (
          <Avatar className="h-14 w-14 rounded-md object-cover">
            <AvatarImage src={row.getValue('imgUrl')} alt={name} />
            <AvatarFallback className="rounded-lg">
              {name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
        );
      },
    },
    {
      accessorKey: 'fullName',
      header: 'HỌ VÀ TÊN',
      cell: ({ row }) => {
        const fullName = row.getValue('fullName') as string;
        return <span className="font-medium">{fullName?.toUpperCase()}</span>;
      },
    },
    {
      accessorKey: 'title',
      header: 'DANH HIỆU',
      cell: ({ row }) => {
        const title = row.getValue('title') as string;
        return <span>{title}</span>;
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
      accessorKey: 'role',
      header: 'CHỨC VỤ',
      cell: ({ row }) => {
        const role = row.getValue('role') as HumanResourceRole;
        const roleLabel = HUMAN_RESOURCE_ROLES_LABEL[role] || 'Không xác định';
        const roleStyle = HUMAN_RESOURCE_ROLE_STYLES[role] || 'bg-gray-100 text-gray-500';

        return (
          <Badge variant="outline" className={cn('flex items-center px-2 py-1 rounded-md w-max', roleStyle)}>
            {roleLabel}
          </Badge>
        );
      },
    },
    {
      accessorKey: 'createDate',
      header: 'NGÀY TẠO',
      cell: ({ row }) => {
        const date = row.getValue('createDate') as string;
        return <span>{format(date, 'dd-MM-yyyy')}</span>;
      },
    },
    {
      id: 'actions',
      header: 'Hành động',
      cell: ({ row }) => {
        const resource = row.original;

        return (
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" onClick={() => handleUpdate(resource)}>
              <Edit className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <EllipsisVertical className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent side="bottom" align="end">
                <DropdownMenuItem>
                  <EyeIcon />
                  Xem chi tiết
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
      <HeaderContent title="Nhân Sự" subTitle="Quản lý thông tin nhân sự" />

      <Card className="px-4 py-2 shadow-md">
        {/* Search Input */}
        <div className="flex flex-wrap items-center gap-2 py-4">
          <Input
            placeholder="Tìm kiếm theo tên.."
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            className="max-w-sm sm:w-full"
          />

          <Select
            value={roleFilter}
            onValueChange={(value) => {
              setRoleFilter(value);
            }}
          >
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Lọc theo chức vụ" />
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

          <Button
            variant="outline"
            onClick={() => {
              setSearchValue('');
              setRoleFilter('');
              setIsShowFilter(true);
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

            <HumanResourceForm
              mode={actions}
              humanResource={humanResource!}
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
          data={humanResources}
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

export default withAuth(HumanResourcePage);
