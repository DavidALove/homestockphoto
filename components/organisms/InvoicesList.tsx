'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Loader2 } from 'lucide-react';
import { Invoice } from '@/types';

export function InvoicesList() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch invoices from API
    setLoading(true);
    setTimeout(() => {
      setInvoices([]);
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

  if (invoices.length === 0) {
    return (
      <Card>
        <CardContent className="py-20 text-center">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No invoices yet</h3>
          <p className="text-muted-foreground mb-6">
            Your purchase invoices will appear here
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
      {invoices.map((invoice) => (
        <Card key={invoice.id}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-1">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-primary/50" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">Invoice #{invoice.stripe_invoice_id.slice(-8)}</h3>
                    <Badge variant="secondary">Paid</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {new Date(invoice.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Amount: ${((invoice.amount_cents + (invoice.tax_cents || 0)) / 100).toFixed(2)}
                    {invoice.tax_cents && invoice.tax_cents > 0 && (
                      <span> (Tax: ${(invoice.tax_cents / 100).toFixed(2)})</span>
                    )}
                  </p>
                </div>
              </div>
              <div className="ml-4">
                {invoice.pdf_url ? (
                  <Button variant="outline" asChild>
                    <a href={invoice.pdf_url} target="_blank" rel="noopener noreferrer">
                      <Download className="mr-2 h-4 w-4" />
                      Download PDF
                    </a>
                  </Button>
                ) : (
                  <Button variant="outline" disabled>
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

