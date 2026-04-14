import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <title>Page not found — YourVue</title>
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
        <div className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-12 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100">
            <span className="text-xl font-semibold text-zinc-400">?</span>
          </div>

          <h1 className="mb-2 text-xl font-semibold text-zinc-900">
            Page not found
          </h1>

          <p className="mb-7 text-sm leading-relaxed text-zinc-500">
            The page you're looking for doesn't exist or has been moved.
          </p>

          <Link
            href="/"
            className="inline-flex h-10 items-center justify-center rounded-md bg-zinc-900 px-6 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </>
  );
}
