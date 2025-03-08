'use client';

import { DataTable } from '@/app/components/dashboard/DataTable';
import HeaderContent from '@/app/components/dashboard/HeaderContent';
import withAuth from '@/app/components/withAuth';
import type InstituteEcosystem from '@/app/models/features/instituteEcosystem';
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
  const [instituteEcosystems, setInstituteEcosystems] = useState<InstituteEcosystem[]>([]);
  const [instituteEcosystem, setInstituteEcosystem] = useState<InstituteEcosystem | null>(null);
  const [reLoadData, setReLoadData] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);

  const [actions, setActions] = useState<btnActions>('CREATE');
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const navigation = useRouter();

  const fetchInstituteEcosystem = async () => {
    try {
      // const response = await getHumanResource(page, limit, total, {
      //   query: searchValue,
      //   role: roleFilter,
      //   isShow: isShowFilter,
      // });
      // setHumanResources(response.members);
      // setTotal(response.pagination.total);
    } catch (error) {
      console.error('Error fetching human resource:', error);
    }
  };

  useEffect(() => {
    fetchInstituteEcosystem();
  }, [page, limit, searchValue, roleFilter, isShowFilter, reLoadData]);

  const handleUpdate = (resource: InstituteEcosystem) => {
    setActions('UPDATE');
    setIsDialogOpen(true);
    setInstituteEcosystem(resource);
  };

  const handleDelete = async (resource: InstituteEcosystem) => {
    try {
      // const request = await deleteHumanResourceById(resource.id);
      // if (request) {
      //   toast.success('Đã xóa nhân sự thành công');
      //   fetchHumanResource();
      // } else {
      //   toast.error('Xóa nhân sự thất bại');
      // }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const handleCreate = () => {
    setActions('CREATE');
    setIsDialogOpen(true);
    setInstituteEcosystem(null);
  };

  const handleToggleShow = async (resource: InstituteEcosystem, checked: boolean) => {
    try {
      resource.isShow = checked;
      const requestBody = {
        name: resource?.name,
        link: resource?.link,
        logoUrl: resource?.logoUrl,
        isShow: resource?.isShow,
      };
      // const request = await updateHumanResourceById(requestBody, resource.id);
      // if (request) {
      //   toast.success('Cập nhật trạng thái hiển thị thành công');
      //   fetchInstituteEcosystem();
      // } else {
      //   toast.error('Cập nhật trạng thái hiển thị thất bại');
      // }
    } catch (error: any) {
      toast.error(error?.message || 'Có lỗi xảy ra');
    }
  };

  // Colunm Table
  const columns: ColumnDef<InstituteEcosystem>[] = [
    {
      accessorKey: 'imgUrl',
      header: 'ẢNH ĐẠI DIỆN',
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
      accessorKey: 'name',
      header: 'TÊN TỔ CHỨC',
      cell: ({ row }) => {
        const name = row.getValue('name') as string;
        return <span className="font-medium">{name?.toUpperCase()}</span>;
      },
    },
    {
      accessorKey: 'link',
      header: 'LIÊN KẾT',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Link className="h-4 w-4 text-primary font-bold" />
          <span className="font-medium text-muted-foreground">{row.getValue('link')}</span>
        </div>
      ),
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
            <DropdownMenu>
              <DropdownMenuTrigger>
                <EllipsisVertical className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent side="bottom" align="end">
                <DropdownMenuItem onClick={() => navigation.push(`/dashboard/human-resource-detail/${resource?.id}`)}>
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

            {/* <HumanResourceForm
              mode={actions}
              humanResource={instituteEcosystem!}
              isDialogOpen={isDialogOpen}
              setIsDialogOpen={setIsDialogOpen}
              reloadData={() => setReLoadData((prev) => !prev)}
            /> */}
          </div>
        </div>

        <Separator className="mt-3 mb-6 text-muted-foreground" />

        {/* Data Table */}
        <DataTable
          columns={columns}
          data={instituteEcosystems}
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
