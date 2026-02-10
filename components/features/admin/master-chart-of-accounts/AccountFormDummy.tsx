'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface AccountFormDummyProps {
  onSuccess?: () => void;
}

export function AccountFormDummy({ onSuccess }: AccountFormDummyProps) {
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setLoading(false);
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="account-code" className="text-sm font-medium">
          Account Code
        </Label>
        <Input
          id="account-code"
          placeholder="e.g., 5300"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="account-name" className="text-sm font-medium">
          Account Name
        </Label>
        <Input
          id="account-name"
          placeholder="e.g., Marketing Expenses"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="account-type" className="text-sm font-medium">
          Account Type
        </Label>
        <Select>
          <SelectTrigger id="account-type">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="account">Account</SelectItem>
            <SelectItem value="subcategory">Subcategory</SelectItem>
            <SelectItem value="category">Category</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="parent-account" className="text-sm font-medium">
          Parent Account
        </Label>
        <Select>
          <SelectTrigger id="parent-account">
            <SelectValue placeholder="Select parent account" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1000">1000 - Assets</SelectItem>
            <SelectItem value="2000">2000 - Liabilities</SelectItem>
            <SelectItem value="3000">3000 - Equity</SelectItem>
            <SelectItem value="4000">4000 - Revenue</SelectItem>
            <SelectItem value="5000">5000 - Expenses</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-medium">
          Description
        </Label>
        <Input
          id="description"
          placeholder="Optional account description"
        />
      </div>

      <div className="pt-4 space-y-3">
        <Button
          type="submit"
          disabled={loading}
          className="w-full "
        >
          {loading ? 'Creating...' : 'Create Account'}
        </Button>
      </div>
    </form>
  );
}
