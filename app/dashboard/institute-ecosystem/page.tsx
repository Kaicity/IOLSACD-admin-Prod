'use client';

import { deleteEcosystemById, getEcosystem, updateEcosystemById } from '@/app/api/ecosystem';
import { DataTable } from '@/app/components/dashboard/DataTable';
import HeaderContent from '@/app/components/dashboard/HeaderContent';
import EcosystemForm from '@/app/components/ecosystem/ecosystem-form';
import withAuth from '@/app/components/withAuth';
import type { Ecosystem } from '@/app/models/features/ecosystem';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import type { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Edit, EllipsisVertical, EyeIcon, Link, PlusCircle, RotateCcwIcon, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

type btnActions = 'CREATE' | 'UPDATE' | 'SEE' | 'PRINT' | 'NULL';

function InstituteEcosystem() {
  const [searchValue, setSearchValue] = useState<string>('');
  const [roleFilter, setRoleFilter] = useState('');
  const [isShowFilter, setIsShowFilter] = useState<boolean>(true);
  const [ecosystems, setEcosystems] = useState<Ecosystem[]>([]);
  const [ecosystem, setEcosystem] = useState<Ecosystem | null>(null);
  const [reLoadData, setReLoadData] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);

  const [actions, setActions] = useState<btnActions>('CREATE');
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const navigation = useRouter();

  const fetchInstituteEcosystem = async () => {
    try {
      const response = await getEcosystem(page, limit, total, {
        query: searchValue,
      });

      console.log(response.ecosystems);

      setEcosystems(response.ecosystems);
      setTotal(response.pagination.total);
    } catch (error: any) {
      toast.error(error?.message || 'Mất kết nối với máy chủ, vui lòng đợi phản hồi');
    }
  };

  useEffect(() => {
    fetchInstituteEcosystem();
  }, [page, limit, searchValue, roleFilter, isShowFilter, reLoadData]);

  const handleUpdate = (resource: Ecosystem) => {
    setActions('UPDATE');
    setIsDialogOpen(true);
    setEcosystem(resource);
  };

  const handleDelete = async (resource: Ecosystem) => {
    try {
      const request = await deleteEcosystemById(resource.id);
      if (request) {
        toast.success('Đã xóa nhân sự thành công');
        fetchInstituteEcosystem();
      } else {
        toast.error('Xóa nhân sự thất bại');
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const handleCreate = () => {
    setActions('CREATE');
    setIsDialogOpen(true);
    setEcosystem(null);
  };

  const handleToggleShow = async (resource: Ecosystem, checked: boolean) => {
    try {
      resource.isShow = checked;
      const requestBody = {
        fullName: resource?.fullName,
        imgUrl: resource?.imgUrl,
        englishName: resource?.englishName,
        isShow: resource?.isShow,
      };
      const request = await updateEcosystemById(requestBody, resource.id);
      if (request) {
        toast.success('Cập nhật trạng thái hiển thị thành công');
        fetchInstituteEcosystem();
      } else {
        toast.error('Cập nhật trạng thái hiển thị thất bại');
      }
    } catch (error: any) {
      toast.error(error?.message || 'Có lỗi xảy ra');
    }
  };

  // Colunm Table
  const columns: ColumnDef<Ecosystem>[] = [
    {
      accessorKey: 'imgUrl',
      header: 'ẢNH',
      cell: ({ row }) => {
        const name = row.getValue('fullName') as string;
        return (
          <Avatar className="h-20 w-20 rounded-md object-cover">
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
      header: 'TÊN TIẾNG VIỆT',
      cell: ({ row }) => {
        const name = row.getValue('fullName') as string;
        return <span className="font-medium">{name?.toUpperCase()}</span>;
      },
    },
    {
      accessorKey: 'englishName',
      header: 'TÊN TIẾNG ANH',
      cell: ({ row }) => {
        const name = row.getValue('englishName') as string;
        return <span className="font-medium">{name?.toUpperCase()}</span>;
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
      accessorKey: 'isShow',
      header: 'HIỂN THỊ',
      cell: ({ row }) => {
        const isShow = row.getValue('isShow') as boolean;
        return <Switch checked={isShow} onCheckedChange={(checked) => handleToggleShow(row.original, checked)} />;
      },
    },
    {
      id: 'actions',
      header: 'HÀNH ĐỘNG',
      cell: ({ row }) => {
        const resource = row.original;

        return (
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" onClick={() => handleUpdate(resource)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="text-red-500" onClick={() => handleDelete(resource)}>
              <Trash />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="">
      <HeaderContent title="Hệ Sinh Thái" subTitle="Quản lý thông tin hệ sinh thái viện" />

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
                {/* {HUMAN_RESOURCE_OPTIONS.map((role) => (
                  <SelectItem key={role.value} value={role.value}>
                    {role.label}
                  </SelectItem>
                ))} */}
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

            <EcosystemForm
              mode={actions}
              humanResource={ecosystem!}
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
          data={ecosystems}
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

export default withAuth(InstituteEcosystem);
