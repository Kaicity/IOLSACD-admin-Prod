import Image from 'next/image';
import LoadingAnimate from '@/public/loading.gif';

export default function Loading() {
  return (
    <div className="w-full h-full flex flex-1 items-center justify-center">
      <div className="flex flex-col items-center">
        <Image src={LoadingAnimate} alt="loading..." width={64} height={64} className="size-16" />
        <p className="text-sm text-muted-foreground font-medium">Đang tải dữ liệu...</p>
      </div>
    </div>
  );
}
