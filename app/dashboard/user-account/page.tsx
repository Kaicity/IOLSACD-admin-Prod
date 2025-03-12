'use client';

import { deleteUserById, getUsers } from '@/app/api/auth';
import { DataTable } from '@/app/components/dashboard/DataTable';
import HeaderContent from '@/app/components/dashboard/HeaderContent';
import withAuth from '@/app/components/withAuth';
import { ROLE_OPTIONS } from '@/app/constants/routeOption';
import { ROLE_ICONS, ROLE_LABELS, ROLE_STYLES, type UserRole } from '@/app/enums/user-account';
import type Account from '@/app/models/features/account';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import type { ColumnDef } from '@tanstack/react-table';
import { Edit, PlusCircle, RotateCcwIcon, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import UserAccountForm from '../../components/user-account/user-account-form';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { format } from 'date-fns';

type btnActions = 'CREATE' | 'UPDATE' | 'SEE' | 'PRINT' | 'NULL';

function UserAccountPage() {
  const [searchValue, setSearchValue] = useState<string>('');
  const [roleFilter, setRoleFilter] = useState('');
  const [isShowFilter, setIsShowFilter] = useState<boolean>(true);
  const [users, setUsers] = useState<Account[]>([]);
  const [user, setUser] = useState<Account | null>(null);
  const [reLoadData, setReLoadData] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);

  const [actions, setActions] = useState<btnActions>('CREATE');
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchUsers();
  }, [page, limit, searchValue, roleFilter, isShowFilter, reLoadData]);

  const fetchUsers = async () => {
    try {
      const response = await getUsers(page, limit, total, { search: searchValue, role: roleFilter });
      setUsers(response.accounts);
      setTotal(response.pagination.total);
    } catch (error: any) {
      toast.error(error?.message || 'Mất kết nối với máy chủ, vui lòng đợi phản hồi');
    }
  };

  const handleUpdate = (resource: Account) => {
    setActions('UPDATE');
    setIsDialogOpen(true);
    setUser(resource);
  };

  const handleDelete = async (resource: Account) => {
    try {
      const request = await deleteUserById(resource.id);
      if (request) {
        toast.success('Đã xóa người dùng thành công');
        fetchUsers();
      } else {
        toast.error('Xóa người dùng thất bại');
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const handleCreate = () => {
    setActions('CREATE');
    setIsDialogOpen(true);
    setUser(null);
  };

  const columns: ColumnDef<Account>[] = [
    {
      accessorKey: 'name',
      header: 'HỌ VÀ TÊN',
      cell: ({ row }) => <span className="font-medium text-card-foreground">{row.getValue('name')}</span>,
    },
    {
      accessorKey: 'userName',
      header: 'TÊN ĐĂNG NHẬP',
      cell: ({ row }) => <span className="font-medium text-muted-foreground">{row.getValue('userName')}</span>,
    },
    {
      accessorKey: 'role',
      header: 'CHỨC VỤ',
      cell: ({ row }) => {
        const role = row.getValue('role') as UserRole;
        const roleLabel = ROLE_LABELS[role] || 'Không xác định';
        const roleIcon = ROLE_ICONS[role] || null;
        const roleStyle = ROLE_STYLES[role] || 'bg-gray-500 text-white';

        return (
          <Badge variant="outline" className={cn('flex items-center px-2 py-1 rounded-md w-max', roleStyle)}>
            {roleIcon} {roleLabel}
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
      header: 'HÀNH ĐỘNG',
      cell: ({ row }) => {
        const resource = row.original;

        return (
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" onClick={() => handleUpdate(resource)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => handleDelete(resource)} className="text-red-500">
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <HeaderContent title="Người dùng" subTitle="Quản lý tài khoản người dùng" />

      <Card className="px-4 py-2 shadow-md">
        {/* Search & Filters */}
        <div className="flex flex-wrap items-center gap-2 py-4">
          <Input
            placeholder="Tìm kiếm theo tên..."
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
                {ROLE_OPTIONS.map((role) => (
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
            <UserAccountForm
              mode={actions}
              account={user!}
              isDialogOpen={isDialogOpen}
              setIsDialogOpen={setIsDialogOpen}
              reloadData={() => setReLoadData((prev) => !prev)}
            />
          </div>
        </div>

        {/* Data Table */}
        <DataTable
          page={page}
          limit={limit}
          total={total}
          onPageChange={setPage}
          onLimitChange={setLimit}
          columns={columns}
          data={users}
        />
      </Card>
    </div>
  );
}

export default withAuth(UserAccountPage);
