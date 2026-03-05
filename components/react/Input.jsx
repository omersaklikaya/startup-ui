// ================================================
// startup-ui — Input Component (React)
// Variants: default, error, disabled, with icon
// Dark mode: class-based (dark:)
// Accessibility: aria-invalid, aria-describedby
// ================================================

import { forwardRef, useId } from "react";

const Input = forwardRef(
  (
    {
      label,
      hint,
      error,
      leftIcon,
      rightIcon,
      className = "",
      disabled = false,
      ...props
    },
    ref
  ) => {
    // useId ile benzersiz id üret — SSR uyumlu
    const id = useId();
    const errorId = `${id}-error`;
    const hintId  = `${id}-hint`;

    const hasError = Boolean(error);

    const inputBase = [
      "w-full rounded-md border bg-white px-3 py-2 text-sm text-neutral-900",
      "placeholder:text-neutral-400 shadow-sm transition-colors",
      "focus:outline-none focus:ring-2",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500",
      // Sol ikon padding
      leftIcon  ? "pl-9" : "",
      rightIcon ? "pr-9" : "",
      // Error vs normal border
      hasError
        ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
        : "border-neutral-300 focus:border-neutral-900 focus:ring-neutral-900/10 dark:border-neutral-700 dark:focus:border-neutral-400 dark:focus:ring-neutral-400/10",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className="flex flex-col gap-1.5">
        {/* Label */}
        {label && (
          <label
            htmlFor={id}
            className={[
              "text-sm font-medium",
              disabled
                ? "text-neutral-400 dark:text-neutral-600"
                : "text-neutral-700 dark:text-neutral-300",
            ].join(" ")}
          >
            {label}
          </label>
        )}

        {/* Input wrapper — ikon varsa relative */}
        <div className="relative">
          {leftIcon && (
            <span
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500"
              aria-hidden="true"
            >
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={id}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={
              [hasError && errorId, hint && hintId].filter(Boolean).join(" ") || undefined
            }
            className={inputBase}
            {...props}
          />

          {rightIcon && (
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500"
              aria-hidden="true"
            >
              {rightIcon}
            </span>
          )}
        </div>

        {/* Hint */}
        {hint && !hasError && (
          <p id={hintId} className="text-xs text-neutral-500 dark:text-neutral-400">
            {hint}
          </p>
        )}

        {/* Error mesajı */}
        {hasError && (
          <p id={errorId} role="alert" className="text-xs text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;

// ── Textarea versiyonu ───────────────────────────
export const Textarea = forwardRef(
  ({ label, hint, error, className = "", disabled = false, ...props }, ref) => {
    const id      = useId();
    const errorId = `${id}-error`;
    const hasError = Boolean(error);

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          className={[
            "w-full resize-y rounded-md border px-3 py-2 text-sm shadow-sm transition-colors",
            "bg-white text-neutral-900 placeholder:text-neutral-400",
            "focus:outline-none focus:ring-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500",
            hasError
              ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
              : "border-neutral-300 focus:border-neutral-900 focus:ring-neutral-900/10 dark:border-neutral-700 dark:focus:border-neutral-400",
            className,
          ].join(" ")}
          {...props}
        />
        {hasError && (
          <p id={errorId} role="alert" className="text-xs text-red-500">{error}</p>
        )}
        {hint && !hasError && (
          <p className="text-xs text-neutral-500 dark:text-neutral-400">{hint}</p>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

// ── Kullanım örnekleri ──────────────────────────
//
// <Input label="E-posta" type="email" placeholder="ada@ornek.com" hint="İş e-postanızı girin." />
//
// <Input label="E-posta" error="Geçerli bir e-posta girin." value="yanlış" />
//
// <Input
//   label="Ara"
//   leftIcon={<SearchIcon className="h-4 w-4" />}
//   placeholder="Bileşen ara..."
// />
//
// <Textarea label="Mesaj" rows={4} placeholder="Mesajınız..." />
