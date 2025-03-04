import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
import Image from "next/image";
import FlagVn from "@/public/language/vietnam.png";
import FlagUk from "@/public/language/united-kingdom.png";
import { Label } from "@/components/ui/label";

export default function ToggleLanguage() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} className="w-9 h-9 rounded-full">
          <Languages className="w-6 h-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="text-sm text-primary">
          Chọn ngôn ngữ
        </DropdownMenuLabel>
        <DropdownMenuItem>
          <div className="flex items-center gap-x-4">
            <Label className="text-sm font-medium">Tiếng Việt</Label>
            <Image src={FlagVn} alt="" className="object-cover w-6 h-6" />
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <div className="flex items-center gap-x-4">
            <Label className="text-sm font-medium">Tiếng Anh</Label>
            <Image src={FlagUk} alt="" className="object-cover w-6 h-6" />
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
