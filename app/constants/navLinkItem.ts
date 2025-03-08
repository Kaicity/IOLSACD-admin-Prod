import { Building, Calendar, FileText, Home, Info, PieChart, UserCircle, Users2 } from 'lucide-react';
import type NavLink from '../models/nav-link.type';

// Dữ liệu navLinks
export const navLinks: NavLink[] = [
  {
    path: '/dashboard',
    label: 'Trang Chủ',
    icon: Home,
    isActive: false,
    children: [],
    group: 'main',
  },
  {
    path: '/dashboard/user-account',
    label: 'Người dùng',
    icon: UserCircle,
    isActive: false,
    group: 'management',
    children: [],
  },
  {
    path: '/dashboard/human-resource',
    label: 'Nhân Sự',
    icon: Users2,
    isActive: false,
    group: 'management',
    children: [],
  },
  {
    path: '/dashboard/post',
    label: 'Bài Viết',
    icon: FileText,
    children: [
      {
        path: '/dashboard/post/service',
        label: 'Dịch Vụ',
        isActive: false,
        group: 'management',
      },
      {
        path: '/dashboard/post/news',
        label: 'Tin Tức',
        isActive: false,
        group: 'management',
      },
      {
        path: '/dashboard/post/knowledge',
        label: 'Kiến Thức',
        isActive: false,
        group: 'management',
      },
    ],
    group: 'management',
    isActive: false,
  },
  {
    path: '/dashboard/consulting-schedule',
    label: 'Lịch Tư Vấn - Liên Hệ',
    icon: Calendar,
    isActive: false,
    children: [
      {
        path: '/dashboard/consulting-schedule/consulting',
        label: 'Tư vấn',
        isActive: false,
        group: 'management',
      },
      {
        path: '/dashboard/consulting-schedule/contact',
        label: 'Liên hệ',
        isActive: false,
        group: 'management',
      },
    ],
    group: 'management',
  },
  {
    path: '/dashboard/institute-ecosystem',
    label: 'Hệ Sinh Thái Viện',
    icon: Building,
    isActive: false,
    children: [],
    group: 'management',
  },
  {
    path: '/dashboard/statistic',
    label: 'Báo cáo',
    icon: PieChart,
    isActive: false,
    children: [],
    group: 'statistic',
  },
  {
    path: '/dashboard/general-information',
    label: 'Thông tin chung',
    icon: Info,
    isActive: true,
    children: [],
    group: 'general-information',
  },
];
