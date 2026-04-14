'use client';

import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function RootError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('[root-error]', error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
      <div className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-12 text-center shadow-sm">
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-amber-50">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="text-amber-500"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>

        <h1 className="mb-2 text-xl font-semibold text-zinc-900">
          Something went wrong
        </h1>

        <p className="mb-7 text-sm leading-relaxed text-zinc-500">
          An unexpected error occurred while loading this page.
        </p>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => {
              window.location.href = '/';
            }}
            className="inline-flex h-10 items-center justify-center rounded-md border border-zinc-200 bg-white px-5 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50"
          >
            Go to Home
          </button>
          <button
            onClick={() => reset()}
            className="inline-flex h-10 items-center justify-center rounded-md bg-zinc-900 px-5 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}
