'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { FilterPanel } from '@/components/molecules/FilterPanel';
import { AssetGrid } from '@/components/molecules/AssetGrid';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SearchFilters } from '@/types';

export function BrowseAssets() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [filters, setFilters] = useState<SearchFilters>({
    category_id: searchParams.get('category') ? parseInt(searchParams.get('category')!) : undefined,
    orientation: undefined,
    resolution: undefined,
    color: undefined,
  });
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);

  // TODO: Replace with actual API call
  useEffect(() => {
    // Placeholder for API call
    setLoading(true);
    setTimeout(() => {
      setAssets([]);
      setLoading(false);
    }, 500);
  }, [searchQuery, filters]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Trigger search
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Browse Assets</h1>
        <p className="text-muted-foreground">
          Discover our collection of professional real estate images and videos
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="search"
              placeholder="Search by keywords, tags, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button type="submit">Search</Button>
        </form>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filter Sidebar */}
        <aside className="lg:w-64 flex-shrink-0">
          <FilterPanel filters={filters} onFiltersChange={setFilters} />
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <Tabs defaultValue="all" className="mb-6">
            <TabsList>
              <TabsTrigger value="all">All Assets</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              <AssetGrid assets={assets} loading={loading} />
            </TabsContent>
            <TabsContent value="images" className="mt-4">
              <AssetGrid assets={assets.filter((a: any) => !a.isVideo)} loading={loading} />
            </TabsContent>
            <TabsContent value="videos" className="mt-4">
              <AssetGrid assets={assets.filter((a: any) => a.isVideo)} loading={loading} />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}

