'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/browse?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/browse');
    }
  };

  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A202C] via-[#2D3748] to-[#1A202C]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,209,255,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,127,0,0.1),transparent_50%)]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Headline */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-[#00D1FF] via-white to-[#FF7F00] bg-clip-text text-transparent">
                Professional Real Estate
              </span>
              <br />
              <span className="text-white">Stock Images & Videos</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Discover high-quality, royalty-free images and videos designed specifically for real estate professionals.
            </p>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="search"
                placeholder="Search for images, videos, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-14 pl-12 pr-32 text-lg bg-background/80 backdrop-blur-sm border-border/50 focus:border-primary"
              />
              <Button
                type="submit"
                size="lg"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                Search
              </Button>
            </div>
          </form>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link href="/browse">
              <Button variant="outline" size="lg" className="bg-background/50 backdrop-blur-sm">
                Browse All Assets
              </Button>
            </Link>
            <Link href="/subscriptions">
              <Button size="lg" variant="secondary" className="bg-accent/10 hover:bg-accent/20 text-accent border border-accent/20">
                View Subscriptions
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">10,000+</div>
              <div className="text-sm text-muted-foreground mt-1">Premium Assets</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">HD & 4K</div>
              <div className="text-sm text-muted-foreground mt-1">High Resolution</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">Instant</div>
              <div className="text-sm text-muted-foreground mt-1">Downloads</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

