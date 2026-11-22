import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="container-site grid min-h-[620px] place-items-center py-16 text-center">
      <div>
        <p className="eyebrow">404 · Page not found</p>
        <h1 className="text-4xl font-semibold sm:text-5xl">This page is outside the event route.</h1>
        <p className="mx-auto mt-4 max-w-lg text-slate-400">
          The page may have moved or the address may be incorrect.
        </p>
        <Link href="/" className="btn-primary mt-8">
          <ArrowLeft size={17} />
          Back to home
        </Link>
      </div>
    </section>
  );
}