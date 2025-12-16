"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StatCardSmall({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: any;
  subtitle?: string;
}) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle className="text-sm text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-indigo-900">{value}</div>
        {subtitle && <div className="text-sm text-muted-foreground">{subtitle}</div>}
      </CardContent>
    </Card>
  );
}
