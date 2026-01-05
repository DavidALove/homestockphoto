import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { DownloadsList } from '@/components/organisms/DownloadsList';

export default function DownloadsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Downloads</h1>
          <p className="text-muted-foreground">
            Access and download your purchased assets
          </p>
        </div>
        <DownloadsList />
      </div>
    </DashboardLayout>
  );
}

