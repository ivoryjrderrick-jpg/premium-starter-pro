"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // You could log to an error service here:
  // console.error(error);

  return (
    <div className="mx-auto max-w-6xl px-4 py-24">
      <h1 className="text-4xl font-bold">Something went wrong</h1>
      <p className="text-gray-600 mt-2">
        Please try again. If the problem continues, contact support.
      </p>
      <button
        onClick={() => reset()}
        className="mt-6 px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-gray-800 focus:outline-none focus:ring"
      >
        Try again
      </button>
    </div>
  );
}
