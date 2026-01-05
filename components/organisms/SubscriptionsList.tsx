'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CreditCard, ExternalLink, Loader2 } from 'lucide-react';
import { Subscription, SubscriptionPlan } from '@/types';

export function SubscriptionsList() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch subscriptions from API
    setLoading(true);
    setTimeout(() => {
      setSubscriptions([]);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (subscriptions.length === 0) {
    return (
      <Card>
        <CardContent className="py-20 text-center">
          <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No active subscriptions</h3>
          <p className="text-muted-foreground mb-6">
            Subscribe to a plan to download multiple assets
          </p>
          <Button asChild>
            <a href="/subscriptions">View Subscription Plans</a>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {subscriptions.map((subscription) => (
        <Card key={subscription.id}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Subscription Plan</CardTitle>
                <CardDescription>
                  Active until {new Date(subscription.current_period_end).toLocaleDateString()}
                </CardDescription>
              </div>
              <Badge variant={subscription.status === 'active' ? 'default' : 'secondary'}>
                {subscription.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Usage Stats */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Image Downloads</span>
                  <span className="text-sm text-muted-foreground">0 / Unlimited</span>
                </div>
                <Progress value={0} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Video Downloads</span>
                  <span className="text-sm text-muted-foreground">0 / Unlimited</span>
                </div>
                <Progress value={0} className="h-2" />
              </div>
            </div>

            {/* Next Billing */}
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Next billing date</p>
              <p className="font-semibold">
                {new Date(subscription.current_period_end).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  // TODO: Open Stripe Customer Portal
                  window.open('https://billing.stripe.com', '_blank');
                }}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Manage in Stripe
              </Button>
              <Button variant="outline" className="flex-1">
                Change Plan
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

