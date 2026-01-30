"use client";
import { Button } from "@/components/ui/button";
import { Edit3, Eye, CheckCircle2, XCircle } from "lucide-react";

export default function PayrollActions({ row }: { row: any }) {
  return (
    <div className="flex gap-2 items-center">
      <Button variant="ghost" size="icon" className="hover:bg-gray-100">
        <Edit3 className="w-5 h-5" />
      </Button>
      <Button variant="ghost" size="icon" className="hover:bg-gray-100">
        <Eye className="w-5 h-5" />
      </Button>
      <Button variant="ghost" size="icon" className="hover:bg-gray-100">
        <CheckCircle2 className="w-5 h-5" />
      </Button>
      <Button variant="ghost" size="icon" className="hover:bg-gray-100">
        <XCircle className="w-5 h-5" />
      </Button>
    </div>
  );
}
