'use client';

import React from 'react';
import { Check, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Feature {
  name: string;
  included: boolean;
}

interface PlanCardProps {
  name: string;
  description: string;
  price: number;
  subscribers: number;
  mrr: string;
  features: Feature[];
  isPopular?: boolean;
}

export function PlanCard({
  name,
  description,
  price,
  subscribers,
  mrr,
  features,
  isPopular = false,
}: PlanCardProps) {
  return (
    <Card
      className={`border-2 p-6 flex flex-col ${
        isPopular ? 'border-indigo-300 bg-indigo-50' : 'border-gray-200 bg-white'
      }`}
    >
      <div className="space-y-4 flex-1">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-xl font-bold text-gray-900">{name}</h3>
            {isPopular && (
              <Badge className="bg-indigo-200 text-indigo-800 text-xs font-medium">
                Popular
              </Badge>
            )}
          </div>
          <p className="text-sm text-gray-600">{description}</p>
        </div>

        {/* Price */}
        <div className="space-y-1 border-t border-b border-gray-200 py-4">
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold text-gray-900">${price}</span>
            <span className="text-gray-600">/month</span>
          </div>
        </div>

        {/* Subscribers Info */}
        <div className="space-y-2 bg-gray-50 rounded-lg p-4">
          <p className="text-sm font-medium text-gray-900">Active Subscribers</p>
          <p className="text-2xl font-bold text-gray-900">{subscribers}</p>
          <p className="text-xs text-gray-600">companies</p>
          <p className="text-sm text-gray-600">MRR: <span className="font-semibold">{mrr}</span></p>
        </div>

        {/* Features */}
        <div className="space-y-2">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-3">
              {feature.included ? (
                <Check className="h-4 w-4 text-green-600 shrink-0" />
              ) : (
                <X className="h-4 w-4 text-gray-300 shrink-0" />
              )}
              <span
                className={`text-sm ${
                  feature.included ? 'text-gray-900' : 'text-gray-400 line-through'
                }`}
              >
                {feature.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex gap-3">
        <Button variant="outline" className="flex-1">
          Edit
        </Button>
        <Button variant="outline" className="flex-1">
          View
        </Button>
      </div>
    </Card>
  );
}
