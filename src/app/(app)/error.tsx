'use client';

import { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function AppError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('[app-error]', error);
  }, [error]);

  return (
    <div
      className="flex items-center justify-center px-4"
      style={{ minHeight: 'calc(100vh - 3.5rem)' }}
    >
      <div className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-12 text-center shadow-sm">
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-amber-50">
          <AlertCircle className="h-6 w-6 text-amber-500" />
        </div>

        <h1 className="mb-2 text-xl font-semibold text-zinc-900">
          Something went wrong
        </h1>

        <p className="mb-7 text-sm leading-relaxed text-zinc-500">
          An error occurred on this page. Your progress has been saved.
        </p>

        <div className="flex items-center justify-center gap-3">
          <Button
            variant="outline"
            onClick={() => {
              window.location.href = '/dashboard';
            }}
          >
            Go to Dashboard
          </Button>
          <Button onClick={() => reset()}>Try again</Button>
        </div>
      </div>
    </div>
  );
}
