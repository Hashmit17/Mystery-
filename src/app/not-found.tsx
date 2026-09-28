import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen grid place-items-center p-6">
      <div className="glass-elevated rounded-3xl p-10 text-center max-w-md">
        <p className="text-sm uppercase tracking-[.25em] text-primary">404</p>
        <h1 className="text-3xl font-bold mt-3">This signal went quiet.</h1>
        <p className="text-muted-foreground mt-3">The page you were looking for does not exist or has moved.</p>
        <Link href="/" className="inline-flex mt-7 h-10 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-white hover:bg-primary/80">Back to MYSTERY</Link>
      </div>
    </main>
  );
}
