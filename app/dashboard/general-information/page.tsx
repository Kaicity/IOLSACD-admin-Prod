'use client';

import HeaderContent from '@/app/components/dashboard/HeaderContent';
import withAuth from '@/app/components/withAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Link, Mail, Phone } from 'lucide-react';
import Image from 'next/image';

function GeneralInformationPage() {
  return (
    <div className="space-y-6">
      <HeaderContent title="Thông tin chung" subTitle="Các thông tin chung của ILC Platform" />

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Thông tin công ty</CardTitle>
          <CardDescription>Giới thiệu tổng quan về công ty</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-gray-700">
          <div className="flex flex-col gap-2 lg:flex-row lg:justify-between border-b pb-2">
            <Label className="font-semibold capitalize">Tên Công ty tiếng Việt</Label>
            <span>{'Viện Khoa học pháp lý và Phát triển doanh nghiệp'.toUpperCase()}</span>
          </div>

          <div className="flex flex-col gap-2 lg:flex-row lg:justify-between border-b pb-2">
            <Label className="font-semibold capitalize">Tên Công ty tiếng anh</Label>
            <span>{'Institute of Legal Science and Corporate Development'.toUpperCase()}</span>
          </div>

          <div className="flex flex-col gap-2 lg:flex-row lg:justify-between border-b pb-2">
            <Label className="font-semibold capitalize">Tên viết tắt</Label>
            <span className="text-orange-500 font-medium">ILC</span>
          </div>

          <div className="flex flex-col gap-2 lg:flex-row lg:justify-between border-b pb-2">
            <Label className="font-semibold capitalize">Địa chỉ</Label>
            <span>Số 32 đường 18, Khu phố 1, phường Phú Hữu, TP. Thủ Đức, TP. HCM</span>
          </div>

          <div className="flex flex-col gap-2 lg:flex-row lg:justify-between border-b pb-2">
            <Label className="font-semibold capitalize">Mã số thuế</Label>
            <span>0318760066</span>
          </div>

          <div className="flex flex-col gap-2 lg:flex-row lg:justify-between border-b pb-2">
            <Label className="font-semibold capitalize">Tài khoản ngân hàng</Label>
            <span>060329927450 Sacombank - Chi nhánh Sài Gòn</span>
          </div>

          <div className="flex flex-col gap-2 lg:flex-row lg:justify-between border-b pb-2">
            <Label className="font-semibold capitalize">Văn phòng tại tỉnh Bình Dương</Label>
            <span>Số 450 Phạm Ngọc Thạch, phường Phú Mỹ, thành phố Thủ Dầu Một, tỉnh Bình Dương</span>
          </div>

          <div className="flex flex-col gap-2 lg:flex-row lg:justify-between border-b pb-2">
            <Label className="font-semibold capitalize">Văn phòng tại Hà Nội</Label>
            <span>Số 70 Trung Hòa, phường Trung Hòa, quận Cầu Giấy, Hà Nội</span>
          </div>

          <div className="flex flex-col gap-2 lg:flex-row lg:justify-between border-b pb-2">
            <Label className="font-semibold capitalize">Email</Label>
            <span className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-yellow-600" />
              <a href="mailto:info@ilcvn.vn">mailto:info@ilcvn.vn</a>
            </span>
          </div>

          <div className="flex flex-col gap-2 lg:flex-row lg:justify-between border-b pb-2">
            <Label className="font-semibold capitalize">Website</Label>
            <span className="flex items-center gap-2 text-primary">
              <Link className="w-4 h-4" />
              <a href="https://ilcvn.vn/">https://ilcvn.vn/</a>
            </span>
          </div>

          <div className="flex flex-col gap-2 lg:flex-row lg:justify-between border-b pb-2">
            <Label className="font-semibold capitalize">Hotline</Label>
            <span className="flex items-center gap-2 text-green-600">
              <Phone className="w-4 h-4" />
              <p>0983285499</p>
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Cơ sở pháp lý</CardTitle>
          <CardDescription>Các quyết định và chứng nhận pháp lý</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700">
          <div className="border-l-4 border-brandPrimary pl-4">
            <Label>Quyết định thành lập</Label>
            <p>Quyết định số 203/QĐ-BTVTWH ngày 21/10/2024 của Hiệp hội doanh nghiệp nhỏ và vừa Việt Nam</p>
          </div>

          <div className="border-l-4 border-brandPrimary pl-4">
            <Label>Giấy phép hoạt động</Label>
            <p>Giấy chứng nhận đăng ký hoạt động khoa học công nghệ số: A-2749 ngày 31/12/2024 của Bộ Khoa học và Công nghệ.</p>
          </div>

          <div className="border-l-4 border-brandPrimary pl-4">
            <Label>Cơ quan quản lý trực tiếp</Label>
            <p>Hiệp hội doanh nghiệp nhỏ và vừa Việt Nam</p>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Ý nghĩa Logo</CardTitle>
          <CardDescription>Biểu tượng và triết lý thiết kế</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center">
            <Image src={'/logo.png'} alt="ILC Logo" width={150} height={150} className="rounded-lg" />
          </div>

          <div className="text-muted-foreground text-justify">
            <p>
              Logo được tạo nên bởi sự kết hợp của quả địa cầu màu xanh cách điệu, chữ cái ILC và tên tiếng Anh của Viện, trong
              đó: Quả địa cầu là biểu hiện cho phạm vi kết nối mạnh mẽ trên phạm vi toàn thế giới. Năn đường cong cách điệu bên
              dưới cùng nét đậm, dày và thanh mảnh dần lên trên thể thể hiện sự chuyển đổi cấp tiến của các doanh nghiệp trong kỷ
              nguyên số. Màu xanh thể hiện nền tảng là mối quan hệ hòa bình, hợp tác hữu nghị, tốt đẹp, một nền kinh tế xanh – bền
              vững. Ba chữ ILC là từ viết tắt của Viện.
            </p>
            <br />
            <p>
              Chữ I ngay thẳng không một nét thừa - nằm ở chính giữa logo, cân đối tổng thể bố cục. Chữ I không chỉ là một từ viết
              tắt mà nó còn là đại diện cho giá trị cốt lõi của Viện - sự chính trực và công bằng của pháp luật sẽ luôn được đặt ở
              trung tâm.
            </p>
            <br />
            <p>
              Chữ L là một biến thể xuất phát từ chữ I. Điều này biểu trưng cho sự phát triển theo hướng đa dạng hóa và chuyển đổi
              linh hoạt.
            </p>
            <br />
            <p>
              Chữ C là sự lồng ghép của 2 hình ảnh chiếc búa thẩm phán giáng xuống mặt gỗ và chiếc kính lúp nghiên cứu, thể hiện
              sự nghiên cứu pháp luật chuyên sâu.
            </p>
            <br />
            Ba chữ ILC màu cam đại diện cho sự sáng tạo, đổi mới và tri thức. Font của chữ ILC có nét dày đậm, hiện đại thể hiện
            truyền thống nhưng cũng sẵn sàng đổi mới. Cuối cùng là dòng chữ đầy đủ của Việ bằng tiếng Anh: Institute of Legal
            Science and Corporate Development. Toàn bộ logo là một sự kết hợp hài hòa mang ý nghĩa: Hợp tác phát triển toàn cầu
            bền vững vì giá trị chung của cộng đồng.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default withAuth(GeneralInformationPage);
