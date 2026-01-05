'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SearchFilters } from '@/types';

interface FilterPanelProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
}

// Placeholder data - will be replaced with API calls
const categories = [
  { id: 1, name: 'Modern Homes' },
  { id: 2, name: 'Interior Design' },
  { id: 3, name: 'Architecture' },
  { id: 4, name: 'Property Tours' },
];

const orientations = [
  { value: 'landscape', label: 'Landscape' },
  { value: 'portrait', label: 'Portrait' },
  { value: 'square', label: 'Square' },
];

const resolutions = [
  { value: '4k', label: '4K Ultra HD' },
  { value: '1080p', label: 'Full HD (1080p)' },
  { value: '720p', label: 'HD (720p)' },
];

export function FilterPanel({ filters, onFiltersChange }: FilterPanelProps) {
  const updateFilter = (key: keyof SearchFilters, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = Object.values(filters).some(v => v !== undefined && v !== '');

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Filters</CardTitle>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="h-8 text-xs"
            >
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Category Filter */}
        <div>
          <Label className="mb-3 block">Category</Label>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category.id} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value={category.id}
                  checked={filters.category_id === category.id}
                  onChange={(e) => updateFilter('category_id', e.target.checked ? category.id : undefined)}
                  className="w-4 h-4 text-primary"
                />
                <span className="text-sm">{category.name}</span>
              </label>
            ))}
          </div>
        </div>

        <Separator />

        {/* Orientation Filter */}
        <div>
          <Label className="mb-3 block">Orientation</Label>
          <div className="space-y-2">
            {orientations.map((orientation) => (
              <label key={orientation.value} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="orientation"
                  value={orientation.value}
                  checked={filters.orientation === orientation.value}
                  onChange={(e) => updateFilter('orientation', e.target.checked ? orientation.value as any : undefined)}
                  className="w-4 h-4 text-primary"
                />
                <span className="text-sm">{orientation.label}</span>
              </label>
            ))}
          </div>
        </div>

        <Separator />

        {/* Resolution Filter */}
        <div>
          <Label className="mb-3 block">Resolution</Label>
          <div className="space-y-2">
            {resolutions.map((resolution) => (
              <label key={resolution.value} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="resolution"
                  value={resolution.value}
                  checked={filters.resolution === resolution.value}
                  onChange={(e) => updateFilter('resolution', e.target.checked ? resolution.value : undefined)}
                  className="w-4 h-4 text-primary"
                />
                <span className="text-sm">{resolution.label}</span>
              </label>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

