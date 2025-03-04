import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function NotificationBell() {
  const notifications = [
    { id: 1, message: "Bạn có một tin nhắn mới" },
    { id: 2, message: "Lịch họp sắp diễn ra vào 10:00 AM" },
  ];

  const unreadCount = notifications.length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} className="relative w-9 h-9 rounded-full">
          <Bell className="w-6 h-6" />
          {unreadCount > 0 && (
            <Badge className="absolute top-0 right-0 h-4 w-1 flex items-center justify-center bg-red-500 text-white text-xs rounded-full">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64">
        <DropdownMenuLabel className="text-sm text-primary">
          Thông báo
        </DropdownMenuLabel>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <DropdownMenuItem key={notification.id}>
              {notification.message}
            </DropdownMenuItem>
          ))
        ) : (
          <DropdownMenuItem className="text-center text-gray-500">
            Không có thông báo
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
