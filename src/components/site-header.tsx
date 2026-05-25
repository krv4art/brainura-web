import Image from "next/image";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--color-border)]/60 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="Brainura"
            width={32}
            height={32}
            className="rounded-lg"
            priority
          />
          <span className="text-lg font-bold tracking-tight text-[var(--color-text)]">
            Brainura
          </span>
        </Link>

        <nav className="flex items-center gap-1 text-sm font-medium text-[var(--color-text-secondary)]">
          <Link
            href="/#features"
            className="hidden sm:block rounded-full px-3 py-2 hover:bg-[var(--color-surface)] hover:text-[var(--color-text)]"
          >
            Features
          </Link>
          <Link
            href="/support"
            className="hidden sm:block rounded-full px-3 py-2 hover:bg-[var(--color-surface)] hover:text-[var(--color-text)]"
          >
            Support
          </Link>
          <Link
            href="/#download"
            className="btn-gradient ml-2 inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
          >
            Download
          </Link>
        </nav>
      </div>
    </header>
  );
}
