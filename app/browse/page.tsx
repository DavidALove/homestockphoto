import { Suspense } from 'react';
import { MainLayout } from '@/components/layouts/MainLayout';
import { BrowseAssets } from '@/components/organisms/BrowseAssets';

export default function BrowsePage() {
  return (
    <MainLayout>
      <Suspense fallback={<div className="container mx-auto px-4 py-20 text-center">Loading...</div>}>
        <BrowseAssets />
      </Suspense>
    </MainLayout>
  );
}

