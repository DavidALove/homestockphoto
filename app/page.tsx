import { MainLayout } from '@/components/layouts/MainLayout';
import { HeroSection } from '@/components/organisms/HeroSection';
import { FeaturedAssets } from '@/components/organisms/FeaturedAssets';

export default function HomePage() {
  return (
    <MainLayout>
      <HeroSection />
      <FeaturedAssets />
    </MainLayout>
  );
}
