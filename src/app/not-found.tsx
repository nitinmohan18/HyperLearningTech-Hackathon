import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="bg-cream grid min-h-[640px] place-items-center py-20 text-center">
      <div className="container-site max-w-lg">
        <div className="eyebrow mx-auto justify-center">
          <span className="h-1.5 w-1.5 rounded-full bg-orange" />
          <span>404 · Route Not Found</span>
        </div>
        <h1 className="font-heading text-4xl font-bold tracking-tight text-espresso sm:text-5xl">
          This page is outside the event route.
        </h1>
        <p className="mx-auto mt-4 text-sm leading-relaxed text-espresso-body">
          The requested page may have moved, expired, or the URL address was typed incorrectly.
        </p>
        <div className="mt-8 flex justify-center">
          <Link href="/" className="btn-primary">
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
