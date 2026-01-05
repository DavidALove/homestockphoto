import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { InvoicesList } from '@/components/organisms/InvoicesList';

export default function InvoicesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Invoices</h1>
          <p className="text-muted-foreground">
            View and download your billing history
          </p>
        </div>
        <InvoicesList />
      </div>
    </DashboardLayout>
  );
}

