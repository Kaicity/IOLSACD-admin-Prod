import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Bell, BellRing, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const notifications = [
  {
    title: 'Người liên hệ tìm kiếm',
    description: '1 giờ trước',
  },
  {
    title: 'Cập nhật thông tin cá nhân của bạn',
    description: '1 giờ trước',
  },
  {
    title: 'Tư vấn cho khách hàng A',
    description: '19 giờ trước',
  },
];

type CardProps = React.ComponentProps<typeof Card>;

export default function NotificationBell({ className, ...props }: CardProps) {
  const unreadCount = notifications.length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'} className="relative w-9 h-9 rounded-full">
          <Bell className="w-6 h-6" />
          {unreadCount > 0 && (
            <Badge className="absolute top-0 right-0 h-4 w-1 flex items-center justify-center bg-red-500 text-white text-xs rounded-full">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-max">
        <div className="p-4 space-y-4">
          <Label>Thông báo</Label>
          <p>Bạn có 3 thông báo mới.</p>

          <div className=" flex items-center space-x-4 rounded-md border p-4">
            <BellRing />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">Thông báo đẩy</p>
              <p className="text-sm text-muted-foreground">Gửi thông báo đến thiết bị.</p>
            </div>
            <Switch />
          </div>
          <div>
            {notifications.map((notification, index) => (
              <div key={index} className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{notification.title}</p>
                  <p className="text-sm text-muted-foreground">{notification.description}</p>
                </div>
              </div>
            ))}
          </div>

          <Button className="w-full">
            <Check /> Đọc tất cả thông báo
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
