'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

interface SubscriptionSettings {
  trialPeriodEnabled: boolean;
  trialDuration: string;
  autoRenewalEnabled: boolean;
  prorateEnabled: boolean;
  gracePeriod: string;
  paymentRemindersEnabled: boolean;
  [key: string]: string | boolean;
}

export function SubscriptionSettingsTab() {
  const [settings, setSettings] = React.useState<SubscriptionSettings>({
    trialPeriodEnabled: false,
    trialDuration: '14',
    autoRenewalEnabled: true,
    prorateEnabled: true,
    gracePeriod: '3',
    paymentRemindersEnabled: true,
  });

  const handleToggle = (key: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleInputChange = (key: string, value: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    console.log('Saving settings:', settings);
    // API call would go here
  };

  return (
    <Card className="border border-gray-200 p-6">
      <div className="space-y-8">
        <h3 className="text-lg font-semibold text-gray-900">Subscription Settings</h3>

        {/* Trial Period */}
        <div className="space-y-3 border-b border-gray-200 pb-6">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <Label className="text-base font-medium text-gray-900">Trial Period</Label>
              <p className="text-sm text-gray-600">Allow new customers to try before buying</p>
            </div>
            <Switch
              checked={settings.trialPeriodEnabled}
              onCheckedChange={() => handleToggle('trialPeriodEnabled')}
            />
          </div>
        </div>

        {/* Trial Duration */}
        <div className="space-y-3 border-b border-gray-200 pb-6">
          <Label htmlFor="trial-duration" className="text-base font-medium text-gray-900">
            Trial Duration (Days)
          </Label>
          <Input
            id="trial-duration"
            type="number"
            value={settings.trialDuration}
            onChange={(e) => handleInputChange('trialDuration', e.target.value)}
            className="w-32"
          />
        </div>

        {/* Auto-Renewal */}
        <div className="space-y-3 border-b border-gray-200 pb-6">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <Label className="text-base font-medium text-gray-900">Auto-Renewal</Label>
              <p className="text-sm text-gray-600">Automatically renew subscriptions</p>
            </div>
            <Switch
              checked={settings.autoRenewalEnabled}
              onCheckedChange={() => handleToggle('autoRenewalEnabled')}
            />
          </div>
        </div>

        {/* Proration */}
        <div className="space-y-3 border-b border-gray-200 pb-6">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <Label className="text-base font-medium text-gray-900">Proration</Label>
              <p className="text-sm text-gray-600">Prorate charges for plan changes</p>
            </div>
            <Switch
              checked={settings.prorateEnabled}
              onCheckedChange={() => handleToggle('prorateEnabled')}
            />
          </div>
        </div>

        {/* Grace Period */}
        <div className="space-y-3 border-b border-gray-200 pb-6">
          <Label htmlFor="grace-period" className="text-base font-medium text-gray-900">
            Grace Period
          </Label>
          <p className="text-sm text-gray-600">Days after payment failure before suspension</p>
          <Input
            id="grace-period"
            type="number"
            value={settings.gracePeriod}
            onChange={(e) => handleInputChange('gracePeriod', e.target.value)}
            className="w-32"
          />
        </div>

        {/* Payment Reminders */}
        <div className="space-y-3 pb-6">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <Label className="text-base font-medium text-gray-900">Payment Reminders</Label>
              <p className="text-sm text-gray-600">Send payment reminders before due date</p>
            </div>
            <Switch
              checked={settings.paymentRemindersEnabled}
              onCheckedChange={() => handleToggle('paymentRemindersEnabled')}
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-6 border-t border-gray-200">
          <Button
            onClick={handleSave}
            className="bg-primary hover:bg-indigo-700 text-white px-8"
          >
            Save Settings
          </Button>
        </div>
      </div>
    </Card>
  );
}
