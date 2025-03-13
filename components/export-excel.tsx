import { exportToExcel } from '@/lib/excel';
import { Button } from './ui/button';

export default function ExportExcel({
  data,
  columns,
}: {
  data: any[];
  columns: { header: string; key: string; width?: number }[];
}) {
  return (
    <Button
      variant={'default'}
      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
      onClick={() => exportToExcel(data, columns)}
    >
      Xuất Excel
    </Button>
  );
}
