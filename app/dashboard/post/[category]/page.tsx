'use client';

import { deleteArticleById, getArticles } from '@/app/api/article';
import { DataTable } from '@/app/components/dashboard/DataTable';
import HeaderContent from '@/app/components/dashboard/HeaderContent';
import withAuth from '@/app/components/withAuth';
import { ARTICLE_TYPE_LABEL, ARTICLE_TYPE_STYLES, type ArticleType } from '@/app/enums/article';
import type Article from '@/app/models/features/arcicle';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import type { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Edit, EllipsisVertical, EyeIcon, PlusCircle, RotateCcwIcon, Trash } from 'lucide-react';
import Image from 'next/image';
import { notFound, useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

const PostPage = () => {
  const params = useParams();
  const navigation = useRouter();

  const validCategories = ['about', 'service', 'news', 'knowledge'];

  if (!validCategories.includes(params?.category as string)) {
    notFound();
  }

  const [searchValue, setSearchValue] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState(params?.category?.toString().toUpperCase());
  const [articles, setArticles] = useState<Article[]>([]);
  const [reLoadData, setReLoadData] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);

  const fetchArticle = async () => {
    try {
      const response = await getArticles(page, limit, total, {
        search: searchValue,
        type: typeFilter,
      });

      setArticles(response.articles);
      setTotal(response.pagination.total);
      setLimit(response.pagination.limit);
    } catch (error: any) {
      toast.error(error?.message || 'Mất kết nối với máy chủ, vui lòng đợi phản hồi');
    }
  };

  useEffect(() => {
    fetchArticle();
  }, [page, limit, searchValue, typeFilter, reLoadData]);

  const toCreatePost = () => {
    switch (params?.category) {
      case 'about':
        navigation.push(`/dashboard/generate-post/about`);
        break;
      case 'service':
        navigation.push(`/dashboard/generate-post/service`);
        break;
      case 'news':
        navigation.push(`/dashboard/generate-post/news`);
        break;
      case 'knowledge':
        navigation.push(`/dashboard/generate-post/knowledge`);
        break;

      default:
        toast.error('Đường dẫn không tồn tại');
        navigation.push(`${params?.category}`);
        break;
    }
  };

  const handleDelete = async (resource: Article) => {
    try {
      const request = await deleteArticleById(resource.id);

      if (request) {
        toast.success('Đã xóa bài báo thành công');
        fetchArticle();
      } else {
        toast.error('Xóa bài báo thất bại');
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const columns: ColumnDef<Article>[] = [
    {
      accessorKey: 'preview_img',
      header: 'HÌNH ẢNH',
      cell: ({ row }) => {
        return <Image width={150} height={30} src={row.getValue('preview_img')} alt="" className="object-cover rounded-md" />;
      },
    },
    {
      accessorKey: 'title',
      header: 'TIÊU ĐỀ',
      cell: ({ row }) => <span className="font-bold text-md text-orange-600">{row.getValue('title')}</span>,
    },
    {
      accessorKey: 'type',
      header: 'THỂ LOẠI',
      cell: ({ row }) => {
        const article = row.getValue('type') as ArticleType;
        const articleLabel = ARTICLE_TYPE_LABEL[article] || 'Không xác định';
        const articleStyle = ARTICLE_TYPE_STYLES[article] || 'bg-gray-100 text-gray-500';

        return (
          <Badge variant="outline" className={cn('flex items-center px-2 py-1 rounded-md w-max', articleStyle)}>
            {articleLabel}
          </Badge>
        );
      },
    },

    {
      accessorKey: 'views',
      header: 'LƯỢT XEM',
      cell: ({ row }) => (
        <div className="flex gap-2 items-center">
          <EyeIcon className="w-4 h-4 text-muted-foreground animate-pulse" />
          <span className="text-primary font-semibold">{row.getValue('views')}</span>
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
      accessorKey: 'updateDate',
      header: 'NGÀY CẬP NHẬT',
      cell: ({ row }) => {
        const date = row.getValue('updateDate') as string;
        return <span>{format(date, 'dd-MM-yyyy')}</span>;
      },
    },
    {
      id: 'actions',
      header: 'HÀNH ĐỘNG',
      cell: ({ row }) => {
        const article = row.original;

        return (
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" onClick={() => navigation.push(`/dashboard/update-post/${article?.id}`)}>
              <Edit className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <EllipsisVertical className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent side="bottom" align="end">
                <DropdownMenuItem onClick={() => navigation.push(`/dashboard/detail-post/${article?.id}`)}>
                  <EyeIcon />
                  Xem chi tiết
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDelete(article)}>
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
      <HeaderContent title="Bài Báo" subTitle="Quản lý thông tin bài báo" />

      <Card className="px-4 py-2 shadow-md">
        {/* Search Input */}
        <div className="flex flex-wrap items-center gap-2 py-4">
          <Input
            placeholder="Tìm kiếm bài báo.."
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            className="max-w-sm sm:w-full"
          />

          <Button
            variant="outline"
            onClick={() => {
              setSearchValue('');
              setPage(1);
            }}
          >
            <RotateCcwIcon className="w-6 h-6" />
          </Button>

          <div className="ml-auto">
            <Button variant="default" className="w-full sm:w-auto" onClick={toCreatePost}>
              <PlusCircle className="w-6 h-6" />
              Tạo
            </Button>
          </div>
        </div>

        <Separator className="mt-3 mb-6 text-muted-foreground" />

        {/* Data Table */}
        <DataTable
          columns={columns}
          data={articles}
          page={page}
          total={total}
          limit={limit}
          onPageChange={setPage}
          onLimitChange={setLimit}
        />
      </Card>
    </div>
  );
};

export default withAuth(PostPage);
