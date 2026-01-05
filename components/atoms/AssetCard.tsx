'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Asset } from '@/types';
import { ImageIcon, VideoIcon, Eye } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface AssetCardProps {
  asset: Asset;
}

export function AssetCard({ asset }: AssetCardProps) {
  const [imageError, setImageError] = useState(false);
  const isVideo = asset.storage_path?.endsWith('.mp4');

  return (
    <Link href={`/assets/${asset.id}`}>
      <Card className="group cursor-pointer overflow-hidden border-border/50 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
        <CardContent className="p-0">
          {/* Asset Preview */}
          <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center overflow-hidden">
            {!imageError && asset.watermarked_url ? (
              <Image
                src={asset.watermarked_url}
                alt={asset.alt_text || asset.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                onError={() => setImageError(true)}
              />
            ) : (
              <>
                <div className="absolute inset-0 bg-[url('/placeholder-pattern.svg')] opacity-10" />
                {isVideo ? (
                  <VideoIcon className="h-16 w-16 text-primary/50 relative z-10" />
                ) : (
                  <ImageIcon className="h-16 w-16 text-primary/50 relative z-10" />
                )}
              </>
            )}
            
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
              <Badge className="bg-background/90 backdrop-blur-sm">
                <Eye className="h-3 w-3 mr-1" />
                View Details
              </Badge>
            </div>

            {/* Type Badge */}
            <Badge className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm">
              {isVideo ? 'Video' : 'Image'}
            </Badge>
          </div>

          {/* Asset Info */}
          <div className="p-4 space-y-2">
            <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
              {asset.title}
            </h3>
            {asset.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {asset.description}
              </p>
            )}
            {asset.tags && asset.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 pt-1">
                {asset.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {asset.tags.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{asset.tags.length - 3}
                  </Badge>
                )}
              </div>
            )}
            <div className="pt-2 flex items-center justify-between">
              <span className="text-sm font-semibold text-primary">
                ${(asset.default_price_cents / 100).toFixed(2)}
              </span>
              {asset.resolution && (
                <span className="text-xs text-muted-foreground">
                  {asset.resolution}
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

