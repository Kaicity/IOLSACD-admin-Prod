"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface isAppProps {
  text: string;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
  className?: string;
  isPending?: boolean;
}

export function SubmitButton({
  text,
  variant,
  className,
  isPending,
}: isAppProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={isPending}
      variant={variant}
      className={cn("w-fit", className)}
    >
      {isPending ? (
        <>
          <Loader2 className="size-4 mr-2 animate-spin" />
          Đang xử lý
        </>
      ) : (
        text
      )}
    </Button>
  );
}

export function DeleteButton({
  text,
  variant,
  className,
  isPending,
}: isAppProps) {
  return (
    <>
      {isPending ? (
        <Button disabled variant={variant} className={cn("w-fit", className)}>
          <Loader2 className="size-4 mr-2 animate-spin"></Loader2>
          Đang xử lý
        </Button>
      ) : (
        <Button className={cn("w-fit", className)} variant={variant}>
          {text}
        </Button>
      )}
    </>
  );
}
