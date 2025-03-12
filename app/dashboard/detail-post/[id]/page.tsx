'use client';

import { getArticleById } from '@/app/api/article';
import withAuth from '@/app/components/withAuth';
import type Article from '@/app/models/features/arcicle';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

function DetailPostPage() {
  const param = useParams();
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    const getHumanResourceDetail = async () => {
      try {
        const data = await getArticleById(param?.id as string);
        if (data) {
          console.log(data);

          setArticle(data);
        } else {
          toast.error('Không tìm thấy thông tin bài báo');
        }
      } catch (error: any) {
        toast.error(error?.message || 'Mất kết nối với máy chủ, vui lòng đợi phản hồi');
      }
    };

    getHumanResourceDetail();
  }, []);

  return (
    <Card className="w-full lg:max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <CardHeader>
        <div>
          <Label className="font-semibold text-gray-600 text-lg">Tiêu đề:</Label>
          <h1 className="text-3xl font-semibold text-blue-600">{article?.title}</h1>
        </div>
        <div className="mt-4 text-sm text-gray-500">
          <div className="mt-2">
            <Label className="text-gray-600 text-lg">Ngày tạo:</Label>
            <p id="created-at" className="text-gray-500">
              {new Date(article?.createDate as string).toLocaleDateString()}
            </p>
          </div>

          <div className="mt-2">
            <Label className="text-gray-600 text-lg">Lượt xem:</Label>
            <p id="view-count" className="text-gray-500">
              {article?.view}
            </p>
          </div>

          <div className="mt-2">
            <Label htmlFor="summary" className="text-gray-600 text-lg">
              Tóm tắt:
            </Label>
            <p id="summary" className="text-gray-600">
              {article?.summary}
            </p>
          </div>

          <div className="mt-2">
            <Label className="text-gray-600 text-lg">Hình ảnh xem trước:</Label>
            <img src={article?.preview_img} alt={article?.title} className="w-full h-auto rounded-lg shadow-lg mt-2" />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Separator />
        <div className="mt-6">
          <Label className=" text-gray-600 text-lg">Nội dung chính bài báo:</Label>
          <div id="content" className="mt-2" dangerouslySetInnerHTML={{ __html: article?.content as TrustedHTML }} />
        </div>
      </CardContent>
    </Card>
  );
}

export default withAuth(DetailPostPage);
