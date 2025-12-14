"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as React from "react";

interface CustomModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
  trigger?: React.ReactNode;
}

export function CustomModal({
  open,
  onOpenChange,
  title,
  description,
  children,
  trigger,
}: CustomModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle className={`${title ? "" : "sr-only"}`}>
            {title}
          </DialogTitle>
          <DialogDescription className={`${description ? "" : "sr-only"}`}>
            {description}
          </DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
