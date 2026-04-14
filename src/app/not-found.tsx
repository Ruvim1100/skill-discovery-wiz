import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
      <div className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-12 text-center shadow-sm">
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100">
          <span className="text-xl font-semibold text-zinc-400">?</span>
        </div>

        <h1 className="mb-2 text-xl font-semibold text-zinc-900">
          Page not found
        </h1>

        <p className="mb-7 text-sm leading-relaxed text-zinc-500">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-flex h-10 items-center justify-center rounded-md bg-zinc-900 px-6 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}
