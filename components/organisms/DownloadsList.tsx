'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, ImageIcon, VideoIcon, Loader2 } from 'lucide-react';
import { Asset } from '@/types';

export function DownloadsList() {
  const [downloads, setDownloads] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch downloads from API
    setLoading(true);
    setTimeout(() => {
      setDownloads([]);
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

  if (downloads.length === 0) {
    return (
      <Card>
        <CardContent className="py-20 text-center">
          <Download className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No downloads yet</h3>
          <p className="text-muted-foreground mb-6">
            Purchase assets to start downloading them here
          </p>
          <Button asChild>
            <a href="/browse">Browse Assets</a>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {downloads.map((asset) => {
        const isVideo = asset.storage_path?.endsWith('.mp4');
        return (
          <Card key={asset.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    {isVideo ? (
                      <VideoIcon className="h-8 w-8 text-primary/50" />
                    ) : (
                      <ImageIcon className="h-8 w-8 text-primary/50" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{asset.title}</h3>
                      <Badge variant="secondary">
                        {isVideo ? 'Video' : 'Image'}
                      </Badge>
                    </div>
                    {asset.description && (
                      <p className="text-muted-foreground text-sm mb-2 line-clamp-2">
                        {asset.description}
                      </p>
                    )}
                    {asset.resolution && (
                      <p className="text-xs text-muted-foreground">
                        Resolution: {asset.resolution}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-2 ml-4">
                  <Button>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  {asset.resolution && (
                    <Button variant="outline" size="sm">
                      Other Resolutions
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

