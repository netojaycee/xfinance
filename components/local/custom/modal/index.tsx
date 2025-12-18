"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "lucide-react";
import * as React from "react";

interface CustomModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  trigger?: React.ReactNode;
  width?: string;
}

export function CustomModal({
  open,
  onOpenChange,
  title,
  description,
  children,
  trigger,
  width = "sm:max-w-xl",
}: CustomModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent
        className={`${width} max-h-[90vh] overflow-hidden rounded-xl p-0`}
      >
        <div className="sticky top-0 z-10 bg-background  border-b rounded-t-xl bg-linear-to-r from-cyan-500 to-blue-500 px-6 py-4 flex items-center gap-2">
          <span className="bg-white/20 rounded-full p-2">
            <Calendar className="text-white w-5 h-5" />
          </span>
          <div>
            <DialogTitle
              className={`${
                title ? "text-white font-bold text-lg" : "sr-only"
              }`}
            >
              {title}
            </DialogTitle>
            <p
              className={`${description ? "text-white/80 text-xs" : "sr-only"}`}
            >
              {description}
            </p>
          </div>
        </div>
        <div className="overflow-y-auto max-h-[calc(90vh-80px)] pb-2 pt-0 px-4">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}
