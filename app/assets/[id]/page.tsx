import { MainLayout } from '@/components/layouts/MainLayout';
import { AssetDetail } from '@/components/organisms/AssetDetail';

interface AssetDetailPageProps {
  params: {
    id: string;
  };
}

export default function AssetDetailPage({ params }: AssetDetailPageProps) {
  return (
    <MainLayout>
      <AssetDetail assetId={params.id} />
    </MainLayout>
  );
}

