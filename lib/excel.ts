import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { toast } from 'sonner';

export const exportToExcel = async (
  data: any[],
  columns: { header: string; key: string; width?: number }[],
  fileName = 'data.xlsx',
) => {
  if (!data || data.length === 0) {
    toast.warning('Không có dữ liệu để xuất');
    return;
  }

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Danh sách');

  worksheet.columns = columns.map((col) => ({
    header: col.header,
    key: col.key,
    width: col.width || 20,
  }));

  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true, color: { argb: 'FFFFFF' } };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '4F81BD' },
    };
    cell.alignment = { horizontal: 'center', vertical: 'middle' };
  });

  data.forEach((item) => {
    worksheet.addRow(item);
  });

  worksheet.eachRow((row) => {
    row.eachCell((cell) => {
      cell.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' },
      };
    });
  });

  // Xuất file
  const buffer = await workbook.xlsx.writeBuffer();
  const dataBlob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });

  saveAs(dataBlob, fileName);
};
