// ================================================
// startup-ui — Card Component (React)
// Variants: default, interactive, stat
// Dark mode: class-based (dark:)
// ================================================

// ── Base Card ────────────────────────────────────
export function Card({ children, className = "", ...props }) {
  return (
    <article
      className={[
        "rounded-xl border border-neutral-200 bg-white p-6 shadow-sm",
        "dark:border-neutral-800 dark:bg-neutral-900",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </article>
  );
}

export function CardHeader({ children, className = "" }) {
  return <header className={["mb-4", className].join(" ")}>{children}</header>;
}

export function CardTitle({ children, className = "" }) {
  return (
    <h3 className={["text-lg font-semibold text-neutral-900 dark:text-neutral-100", className].join(" ")}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className = "" }) {
  return (
    <p className={["mt-1 text-sm text-neutral-500 dark:text-neutral-400", className].join(" ")}>
      {children}
    </p>
  );
}

export function CardContent({ children, className = "" }) {
  return (
    <section className={["text-sm text-neutral-700 dark:text-neutral-300", className].join(" ")}>
      {children}
    </section>
  );
}

export function CardFooter({ children, className = "" }) {
  return (
    <footer className={["mt-6 flex items-center justify-end gap-2", className].join(" ")}>
      {children}
    </footer>
  );
}

// ── Interactive Card ──────────────────────────────
export function InteractiveCard({ children, className = "", onClick, ...props }) {
  return (
    <article
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}
      className={[
        "group cursor-pointer rounded-xl border border-neutral-200 bg-white p-6 shadow-sm",
        "transition-all duration-200 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-md",
        "dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </article>
  );
}

// ── Stat Card ─────────────────────────────────────
export function StatCard({ label, value, trend, trendPositive = true }) {
  return (
    <article className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
      <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">{label}</p>
      <p className="mt-2 text-3xl font-bold text-neutral-900 dark:text-neutral-100">{value}</p>
      {trend && (
        <p
          className={[
            "mt-1 flex items-center gap-1 text-xs",
            trendPositive
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-red-500 dark:text-red-400",
          ].join(" ")}
        >
          {/* Trend ok işareti */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={["h-3.5 w-3.5", !trendPositive && "rotate-180"].join(" ")}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            aria-hidden="true"
          >
            <polyline points="18 15 12 9 6 15" />
          </svg>
          {trend}
        </p>
      )}
    </article>
  );
}

// ── Kullanım örnekleri ──────────────────────────
//
// <Card>
//   <CardHeader>
//     <CardTitle>Başlık</CardTitle>
//     <CardDescription>Açıklama</CardDescription>
//   </CardHeader>
//   <CardContent>İçerik</CardContent>
//   <CardFooter>
//     <button>İptal</button>
//     <button>Kaydet</button>
//   </CardFooter>
// </Card>
//
// <InteractiveCard onClick={() => console.log("clicked")}>
//   ...
// </InteractiveCard>
//
// <StatCard label="Kullanıcı" value="12,430" trend="%8.2 artış" trendPositive />
