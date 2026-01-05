import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { SubscriptionsList } from '@/components/organisms/SubscriptionsList';

export default function SubscriptionsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Subscriptions</h1>
          <p className="text-muted-foreground">
            Manage your subscription plans and download limits
          </p>
        </div>
        <SubscriptionsList />
      </div>
    </DashboardLayout>
  );
}

