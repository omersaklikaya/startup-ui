// ================================================
// startup-ui — Button Component (React)
// Variants: primary, secondary, outline, destructive, ghost
// Props: variant, size, loading, disabled, icon, children
// Dark mode: class-based (dark:)
// ================================================

import { forwardRef } from "react";

const variants = {
  primary:
    "bg-black text-white hover:bg-neutral-800 focus-visible:outline-black dark:bg-white dark:text-black dark:hover:bg-neutral-200 dark:focus-visible:outline-white",
  secondary:
    "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700",
  outline:
    "border border-neutral-300 bg-transparent text-neutral-900 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-800",
  destructive:
    "bg-red-600 text-white hover:bg-red-700 focus-visible:outline-red-600 dark:bg-red-700 dark:hover:bg-red-600",
  ghost:
    "bg-transparent text-neutral-900 hover:bg-neutral-100 dark:text-neutral-100 dark:hover:bg-neutral-800",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
  icon: "p-2",
};

const Button = forwardRef(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      disabled = false,
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        aria-busy={loading}
        aria-disabled={isDisabled}
        className={[
          // Base
          "inline-flex items-center justify-center gap-2 rounded-md font-medium shadow-sm",
          "transition-colors duration-150",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          // Variant & size
          variants[variant],
          sizes[size],
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {/* Spinner — sadece loading state'de göster */}
        {loading && (
          <svg
            className="h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;

// ── Kullanım örnekleri ──────────────────────────
//
// <Button>Primary</Button>
// <Button variant="secondary">Secondary</Button>
// <Button variant="outline">Outline</Button>
// <Button variant="destructive">Sil</Button>
// <Button loading>Yükleniyor</Button>
// <Button disabled>Devre Dışı</Button>
// <Button size="lg" variant="primary">Büyük</Button>
