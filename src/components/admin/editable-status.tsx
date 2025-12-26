"use client";

import { useState, useTransition } from "react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Spinner } from "../ui/spinner";

type Props = {
  id: string;
  currentStatus: string;
  options: string[];
  onUpdate: (
    id: string,
    status: string,
  ) => Promise<{ success: boolean; message: string }>;
  colorMap?: Record<
    string,
    "default" | "secondary" | "destructive" | "outline"
  >;
};

export const EditableStatus = ({
  id,
  currentStatus,
  options,
  onUpdate,
  colorMap,
}: Props) => {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const getBadgeVariant = (status: string) => {
    if (colorMap && colorMap[status]) return colorMap[status];

    if (["paid", "success", "completed", "shipped", "delivered"].includes(status))
      return "default";
    if (["cancelled", "failed", "unpaid"].includes(status))
      return "destructive";
    return "secondary";
  };

  const handleSelect = (newStatus: string) => {
    if (newStatus === currentStatus) return;

    startTransition(async () => {
      const res = await onUpdate(id, newStatus);
      if (res.success) {
        toast.success(res.message);
        setIsOpen(false);
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button
          disabled={isPending}
          className="group flex items-center gap-1 focus:outline-none"
        >
          <Badge
            variant={getBadgeVariant(currentStatus)}
            className={cn(
              "flex cursor-pointer items-center gap-1 pr-1 capitalize transition-all hover:opacity-80",
              isPending && "opacity-50",
            )}
          >
            {currentStatus}
            {isPending ? (
              <Spinner />
            ) : (
              <ChevronDown className="h-3 w-3 opacity-50 group-hover:opacity-100" />
            )}
          </Badge>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {options.map((option) => (
          <DropdownMenuItem
            key={option}
            onClick={() => handleSelect(option)}
            className="capitalize"
            disabled={isPending}
          >
            {option}
            {option === currentStatus && (
              <span className="text-primary ml-2">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
