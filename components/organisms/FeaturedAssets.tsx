'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ImageIcon, VideoIcon, ArrowRight } from 'lucide-react';
import Link from 'next/link';

// Placeholder data - will be replaced with actual API calls
const featuredCategories = [
  {
    id: 1,
    name: 'Modern Homes',
    image: '/placeholder-home.jpg',
    count: 1250,
    type: 'image' as const,
  },
  {
    id: 2,
    name: 'Interior Design',
    image: '/placeholder-interior.jpg',
    count: 890,
    type: 'image' as const,
  },
  {
    id: 3,
    name: 'Property Tours',
    image: '/placeholder-video.jpg',
    count: 340,
    type: 'video' as const,
  },
  {
    id: 4,
    name: 'Architecture',
    image: '/placeholder-architecture.jpg',
    count: 670,
    type: 'image' as const,
  },
];

export function FeaturedAssets() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Featured Categories
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our most popular collections of real estate imagery
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCategories.map((category) => (
            <Link key={category.id} href={`/browse?category=${category.id}`}>
              <Card className="group cursor-pointer overflow-hidden border-border/50 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
                <CardContent className="p-0">
                  {/* Placeholder Image */}
                  <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/placeholder-pattern.svg')] opacity-10" />
                    {category.type === 'video' ? (
                      <VideoIcon className="h-16 w-16 text-primary/50" />
                    ) : (
                      <ImageIcon className="h-16 w-16 text-primary/50" />
                    )}
                    <Badge className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm">
                      {category.type === 'video' ? 'Video' : 'Image'}
                    </Badge>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {category.count.toLocaleString()} assets
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full group-hover:text-primary group-hover:bg-primary/10"
                    >
                      Browse
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/browse">
            <Button size="lg" variant="outline">
              View All Categories
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

