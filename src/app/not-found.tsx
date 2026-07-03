import Link from "next/link";
import { Scale, ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 items-center justify-center bg-[var(--color-navy)] px-6 py-24">
        <div className="relative text-center text-white">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.18),_transparent_60%)]"
          />
          <Scale className="mx-auto h-12 w-12 text-[var(--color-gold)]" />
          <p className="mt-6 font-display text-7xl font-bold text-[var(--color-gold)]">404</p>
          <h1 className="mt-4 font-display text-2xl font-semibold sm:text-3xl">
            This case has no precedent
          </h1>
          <p className="mt-3 max-w-md text-white/70">
            The page you&apos;re looking for doesn&apos;t exist or may have been moved. Let&apos;s get you back on
            track.
          </p>
          <Button asChild variant="gold" size="lg" className="mt-8">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Link>
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
}
