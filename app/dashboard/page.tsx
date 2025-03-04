'use client';

import { Activity, FileText, Podcast, Users } from 'lucide-react';
import { XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, CartesianGrid, Legend, Line } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import withAuth from '../components/withAuth';

const Page = () => {
  const data_1 = [
    {
      name: 'Tháng 1',
      bài_viết: 40,
      tin_tức: 24,
    },
    {
      name: 'Tháng 2',
      bài_viết: 30,
      tin_tức: 13,
    },
    {
      name: 'Tháng 3',
      bài_viết: 20,
      tin_tức: 98,
    },
    {
      name: 'Tháng 4',
      bài_viết: 27,
      tin_tức: 39,
    },
    {
      name: 'Tháng 5',
      bài_viết: 18,
      tin_tức: 48,
    },
    {
      name: 'Tháng 6',
      bài_viết: 23,
      tin_tức: 38,
    },
    {
      name: 'Tháng 7',
      bài_viết: 34,
      tin_tức: 43,
    },
  ];

  const data_2 = [
    {
      name: 'Tháng 1',
      bài_viết: 50,
      tin_tức: 30,
    },
    {
      name: 'Tháng 2',
      bài_viết: 25,
      tin_tức: 20,
    },
    {
      name: 'Tháng 3',
      bài_viết: 35,
      tin_tức: 85,
    },
    {
      name: 'Tháng 4',
      bài_viết: 40,
      tin_tức: 50,
    },
    {
      name: 'Tháng 5',
      bài_viết: 22,
      tin_tức: 60,
    },
    {
      name: 'Tháng 6',
      bài_viết: 30,
      tin_tức: 45,
    },
    {
      name: 'Tháng 7',
      bài_viết: 45,
      tin_tức: 55,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-xl transition-shadow duration-300 shadow-md border-b-4 border-b-blue-500">
          <CardHeader>
            <CardTitle className="text-sm font-bold text-card-foreground">Tổng bài viết</CardTitle>
            <CardDescription>Chỉ số thu thập hàng tháng</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="p-2 w-10 h-10 bg-primary/10 rounded-md">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <span className="text-2xl font-bold">120</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-shadow duration-300 shadow-md border-b-4 border-b-green-500">
          <CardHeader>
            <CardTitle className="text-sm font-bold text-card-foreground">Tổng tin tức</CardTitle>
            <CardDescription>Chỉ số thu thập hàng tháng</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="p-2 w-10 h-10 bg-green-500/10 rounded-md">
                <Podcast className="w-6 h-6 text-green-500" />
              </div>
              <span className="text-2xl font-bold">45</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-shadow duration-300 shadow-md border-b-4 border-b-yellow-500">
          <CardHeader>
            <CardTitle className="text-sm font-bold text-card-foreground">Lượt xem</CardTitle>
            <CardDescription>Chỉ số thu thập hàng tháng</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="p-2 w-10 h-10 bg-yellow-500/10 rounded-md">
                <Activity className="w-6 h-6 text-yellow-500" />
              </div>
              <span className="text-2xl font-bold">1,234</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-shadow duration-300 shadow-md border-b-4 border-b-red-500">
          <CardHeader>
            <CardTitle className="text-sm font-bold text-card-foreground">Người dùng</CardTitle>
            <CardDescription>Chỉ số thu thập hàng tháng</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="p-2 w-10 h-10 bg-red-500/10 rounded-md">
                <Users className="w-6 h-6 text-red-500" />
              </div>
              <span className="text-2xl font-bold">56</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Biểu đồ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Thống kê bài viết và tin tức</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart width={730} height={250} data={data_1} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="bài_viết" stroke="#8884d8" name="Bài viết" />
                  <Line type="monotone" dataKey="tin_tức" stroke="#82ca9d" name="Tin tức" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Thống kê bài viết và tin tức</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart width={730} height={250} data={data_2} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="bài_viết" stroke="#8884d8" name="Bài viết" />
                  <Line type="monotone" dataKey="tin_tức" stroke="#82ca9d" name="Tin tức" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Hoạt động gần đây */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Hoạt động gần đây</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <div>
                <p className="text-sm">Bài viết mới: Hướng dẫn sử dụng Nextjs</p>
                <p className="text-xs text-gray-500">2 giờ trước</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <div>
                <p className="text-sm">Tin tức mới: Cập nhật công nghệ 2023</p>
                <p className="text-xs text-gray-500">5 giờ trước</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <div>
                <p className="text-sm">Người dùng mới: user123</p>
                <p className="text-xs text-gray-500">1 ngày trước</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default withAuth(Page);
