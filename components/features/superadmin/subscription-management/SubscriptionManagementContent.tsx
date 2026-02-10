'use client';

import React from 'react';
import { CustomTabs, Tab } from '@/components/local/custom/tabs';
import { PlanCard } from './PlanCard';
import { SubscriptionSettingsTab } from './SubscriptionSettingsTab';

function PlansTab() {
  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for small businesses',
      price: 49,
      subscribers: 420,
      mrr: '$20,580',
      features: [
        { name: 'Up to 5 users', included: true },
        { name: 'Basic accounting features', included: true },
        { name: 'Email support', included: true },
        { name: 'Single entity', included: true },
        { name: 'Multi-currency', included: false },
        { name: 'Advanced reporting', included: false },
        { name: 'API access', included: false },
        { name: 'Dedicated support', included: false },
      ],
    },
    {
      name: 'Professional',
      description: 'For growing businesses',
      price: 299,
      subscribers: 315,
      mrr: '$94,185',
      features: [
        { name: 'Up to 25 users', included: true },
        { name: 'All accounting features', included: true },
        { name: 'Priority email support', included: true },
        { name: 'Up to 3 entities', included: true },
        { name: 'Multi-currency', included: true },
        { name: 'Advanced reporting', included: true },
        { name: 'API access', included: false },
        { name: 'Dedicated support', included: false },
      ],
      isPopular: true,
    },
    {
      name: 'Enterprise',
      description: 'For large organizations',
      price: 899,
      subscribers: 112,
      mrr: '$100,688',
      features: [
        { name: 'Unlimited users', included: true },
        { name: 'All accounting features', included: true },
        { name: '24/7 phone & email support', included: true },
        { name: 'Unlimited entities', included: true },
        { name: 'Multi-currency', included: true },
        { name: 'Advanced reporting', included: true },
        { name: 'API access', included: true },
        { name: 'Dedicated account manager', included: true },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan, idx) => (
          <PlanCard key={idx} {...plan} />
        ))}
      </div>
    </div>
  );
}

export function SubscriptionManagementContent() {
  const tabs: Tab[] = [
    {
      title: 'Plans',
      value: 'plans',
      content: <PlansTab />,
    },
    {
      title: 'Settings',
      value: 'settings',
      content: <SubscriptionSettingsTab />,
    },
  ];

  return <CustomTabs tabs={tabs} storageKey="subscription-management-tab" />;
}
