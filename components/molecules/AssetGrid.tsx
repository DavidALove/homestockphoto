'use client';

import { AssetCard } from '@/components/atoms/AssetCard';
import { Asset } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

interface AssetGridProps {
  assets: Asset[];
  loading: boolean;
}

export function AssetGrid({ assets, loading }: AssetGridProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (assets.length === 0) {
    return (
      <Card>
        <CardContent className="py-20 text-center">
          <p className="text-muted-foreground text-lg">
            No assets found. Try adjusting your filters or search terms.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {assets.map((asset) => (
        <AssetCard key={asset.id} asset={asset} />
      ))}
    </div>
  );
}

