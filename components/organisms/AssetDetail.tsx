'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Asset, PricingTier, SubscriptionPlan } from '@/types';
import { ImageIcon, VideoIcon, Download, ShoppingCart, CreditCard, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface AssetDetailProps {
  assetId: string;
}

// Placeholder pricing tiers
const pricingTiers: PricingTier[] = [
  { id: '1', name: 'Standard License', price_cents: 2999 },
  { id: '2', name: 'Extended License', price_cents: 7999 },
  { id: '3', name: 'Premium License', price_cents: 14999 },
];

// Placeholder subscription plans
const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: '1',
    name: 'Basic',
    stripe_product_id: '',
    billing_interval: 'month',
    image_download_limit: 10,
    video_download_limit: 5,
    price_cents: 2999,
  },
  {
    id: '2',
    name: 'Professional',
    stripe_product_id: '',
    billing_interval: 'month',
    image_download_limit: 50,
    video_download_limit: 20,
    price_cents: 7999,
  },
];

export function AssetDetail({ assetId }: AssetDetailProps) {
  const router = useRouter();
  const [asset, setAsset] = useState<Asset | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTier, setSelectedTier] = useState<string>(pricingTiers[0].id);
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    // TODO: Fetch asset data from API
    setLoading(true);
    setTimeout(() => {
      // Placeholder data
      setAsset({
        id: assetId,
        title: 'Modern Home Exterior',
        description: 'Beautiful modern home with clean lines and contemporary architecture. Perfect for real estate listings and marketing materials.',
        tags: ['home', 'modern', 'exterior', 'architecture'],
        category_id: 1,
        alt_text: 'Modern home exterior',
        copyright_info: '© 2024 HomeStockPhoto',
        default_price_cents: 2999,
        subscription_limit: 1,
        storage_path: '/assets/example.jpg',
        created_by: '',
        created_at: new Date().toISOString(),
        orientation: 'landscape',
        resolution: '4K',
      });
      setLoading(false);
    }, 500);
  }, [assetId]);

  const handlePurchase = async () => {
    setPurchasing(true);
    // TODO: Implement Stripe checkout
    setTimeout(() => {
      setPurchasing(false);
      router.push('/dashboard/downloads');
    }, 1000);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!asset) {
    return (
      <div className="container mx-auto px-4 py-20">
        <Card>
          <CardContent className="py-20 text-center">
            <p className="text-muted-foreground">Asset not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isVideo = asset.storage_path?.endsWith('.mp4');
  const selectedTierData = pricingTiers.find(t => t.id === selectedTier);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Asset Preview */}
        <div>
          <Card>
            <CardContent className="p-0">
              <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center overflow-hidden rounded-t-lg">
                {asset.watermarked_url ? (
                  <Image
                    src={asset.watermarked_url}
                    alt={asset.alt_text || asset.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-[url('/placeholder-pattern.svg')] opacity-10" />
                    {isVideo ? (
                      <VideoIcon className="h-32 w-32 text-primary/50 relative z-10" />
                    ) : (
                      <ImageIcon className="h-32 w-32 text-primary/50 relative z-10" />
                    )}
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Asset Details & Purchase */}
        <div className="space-y-6">
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{asset.title}</h1>
                <div className="flex flex-wrap gap-2">
                  {asset.tags?.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <Badge variant="outline" className="ml-4">
                {isVideo ? 'Video' : 'Image'}
              </Badge>
            </div>

            <p className="text-muted-foreground mb-4">{asset.description}</p>

            <div className="grid grid-cols-2 gap-4 text-sm">
              {asset.orientation && (
                <div>
                  <span className="text-muted-foreground">Orientation:</span>
                  <span className="ml-2 font-medium capitalize">{asset.orientation}</span>
                </div>
              )}
              {asset.resolution && (
                <div>
                  <span className="text-muted-foreground">Resolution:</span>
                  <span className="ml-2 font-medium">{asset.resolution}</span>
                </div>
              )}
              {asset.copyright_info && (
                <div className="col-span-2">
                  <span className="text-muted-foreground">Copyright:</span>
                  <span className="ml-2 font-medium">{asset.copyright_info}</span>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Purchase Options */}
          <Tabs defaultValue="purchase" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="purchase">One-Time Purchase</TabsTrigger>
              <TabsTrigger value="subscription">Subscription</TabsTrigger>
            </TabsList>

            <TabsContent value="purchase" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Select License Tier</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {pricingTiers.map((tier) => (
                    <label
                      key={tier.id}
                      className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedTier === tier.id
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="tier"
                          value={tier.id}
                          checked={selectedTier === tier.id}
                          onChange={(e) => setSelectedTier(e.target.value)}
                          className="w-4 h-4 text-primary"
                        />
                        <div>
                          <div className="font-medium">{tier.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Full resolution download
                          </div>
                        </div>
                      </div>
                      <div className="text-lg font-bold text-primary">
                        ${(tier.price_cents / 100).toFixed(2)}
                      </div>
                    </label>
                  ))}
                </CardContent>
              </Card>

              <Button
                onClick={handlePurchase}
                disabled={purchasing}
                className="w-full"
                size="lg"
              >
                {purchasing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Purchase for ${selectedTierData ? (selectedTierData.price_cents / 100).toFixed(2) : '0.00'}
                  </>
                )}
              </Button>
            </TabsContent>

            <TabsContent value="subscription" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Subscription Plans</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Download multiple assets with a subscription
                  </p>
                </CardHeader>
                <CardContent className="space-y-3">
                  {subscriptionPlans.map((plan) => (
                    <div
                      key={plan.id}
                      className="p-4 border rounded-lg border-border"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{plan.name}</div>
                        <div className="text-lg font-bold text-primary">
                          ${(plan.price_cents / 100).toFixed(2)}
                          <span className="text-sm text-muted-foreground font-normal">
                            /{plan.billing_interval}
                          </span>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <div>{plan.image_download_limit} image downloads/month</div>
                        <div>{plan.video_download_limit} video downloads/month</div>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full mt-3"
                        onClick={() => router.push(`/subscriptions?plan=${plan.id}&asset=${assetId}`)}
                      >
                        Subscribe
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Metadata Tab Section */}
      <div className="mt-12">
        <Tabs defaultValue="details" className="w-full">
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="metadata">Metadata</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-muted-foreground">{asset.description}</p>
                  </div>
                  {asset.alt_text && (
                    <div>
                      <h3 className="font-semibold mb-2">Alt Text</h3>
                      <p className="text-muted-foreground">{asset.alt_text}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="metadata" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Category ID:</span>
                    <span className="ml-2 font-medium">{asset.category_id}</span>
                  </div>
                  {asset.orientation && (
                    <div>
                      <span className="text-muted-foreground">Orientation:</span>
                      <span className="ml-2 font-medium capitalize">{asset.orientation}</span>
                    </div>
                  )}
                  {asset.resolution && (
                    <div>
                      <span className="text-muted-foreground">Resolution:</span>
                      <span className="ml-2 font-medium">{asset.resolution}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-muted-foreground">Copyright:</span>
                    <span className="ml-2 font-medium">{asset.copyright_info}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

