import Link from 'next/link';
import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="text-2xl mt-4">Trang Không được tìm thấy</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Xin lỗi, chúng tôi không tìm thấy trang này
        </p>
        <Link
          href="/"
          className="mt-6 inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/70"
        >
          Quay lại trang chủ
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
