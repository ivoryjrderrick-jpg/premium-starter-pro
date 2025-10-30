
import Link from 'next/link';
export default function Footer() {
  return (
    <footer className="border-t border-gray-100 mt-24">
      <div className="mx-auto max-w-6xl px-4 py-10 grid md:grid-cols-2 gap-6 text-sm text-gray-600">
        <p>© {new Date().getFullYear()} Acme Co. All rights reserved.</p>
        <div className="flex gap-4 md:justify-end">
          <Link className="hover:underline" href="/privacy">Privacy</Link>
          <Link className="hover:underline" href="/terms">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
