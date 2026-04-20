export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f7f2e7_0%,#efe7d8_100%)] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-6xl gap-5 lg:grid-cols-[minmax(320px,0.95fr)_minmax(420px,0.9fr)]">
        <section
          className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(14,24,11,0.98),rgba(21,37,13,0.93))] p-6 text-cream shadow-floating"
          data-on-dark
        >
          <div className="eyebrow text-cream/60">ServyGo admin</div>
          <h1 className="mt-3 text-[2.5rem] leading-[0.92] text-cream">
            Compact by design. Calm under pressure.
          </h1>
          <p className="mt-4 max-w-xl text-[13px] leading-6 text-cream/78">
            Internal control center for operations, finance, compliance, and support. The
            layout is tuned to carry more data with less wasted space while keeping the most
            sensitive actions deliberate and reviewable.
          </p>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {[
              ["18", "open disputes requiring review"],
              ["27", "documents expiring this week"],
              ["91", "provider payouts queued"],
              ["6", "admin roles simulated in mock mode"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/6 p-4">
                <div className="text-[1.7rem] font-semibold leading-none text-cream">{value}</div>
                <p className="mt-2 text-xs leading-5 text-cream/72">{label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex items-center justify-center">{children}</section>
      </div>
    </div>
  );
}
