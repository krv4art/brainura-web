import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-border)]/60 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row">
        <div className="flex flex-col items-center gap-2 sm:items-start">
          <span className="text-base font-bold text-[var(--color-text)]">
            Brainura
          </span>
          <p className="text-sm text-[var(--color-text-secondary)]">
            © {new Date().getFullYear()} Brainura. All rights reserved.
          </p>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-[var(--color-text-secondary)]">
          <Link href="/privacy" className="hover:text-[var(--color-text)]">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-[var(--color-text)]">
            Terms of Service
          </Link>
          <Link href="/support" className="hover:text-[var(--color-text)]">
            Support
          </Link>
          <a
            href="mailto:krv4art.dev@gmail.com"
            className="hover:text-[var(--color-text)]"
          >
            krv4art.dev@gmail.com
          </a>
        </nav>
      </div>
    </footer>
  );
}
