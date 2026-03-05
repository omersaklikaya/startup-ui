// ================================================
// startup-ui — Toast Component (React)
// Variants: success, error, warning, info
// Features: auto dismiss, stack, context hook
// Accessibility: role=alert, aria-live
// ================================================

import { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

// ── Icons ────────────────────────────────────────
const icons = {
  success: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  ),
  error: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
    </svg>
  ),
  warning: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
      <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  info: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  ),
};

const variantClasses = {
  success: { wrap: "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-100", icon: "text-emerald-600 dark:text-emerald-400" },
  error:   { wrap: "border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-100",                         icon: "text-red-600 dark:text-red-400" },
  warning: { wrap: "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-100",              icon: "text-amber-600 dark:text-amber-400" },
  info:    { wrap: "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-100",                    icon: "text-blue-600 dark:text-blue-400" },
};

// ── Context ──────────────────────────────────────
const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ variant = "info", title, description, duration = 3000 }) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, variant, title, description, duration, visible: true }]);
    if (duration > 0) {
      setTimeout(() => removeToast(id), duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, visible: false } : t)));
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 300);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      {createPortal(
        <div
          aria-live="polite"
          aria-atomic="false"
          className="fixed bottom-4 right-4 z-50 flex flex-col gap-2"
        >
          {toasts.map((toast) => (
            <ToastItem
              key={toast.id}
              toast={toast}
              onClose={() => removeToast(toast.id)}
            />
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
}

// ── Single Toast Item ────────────────────────────
function ToastItem({ toast, onClose }) {
  const v = variantClasses[toast.variant];

  return (
    <div
      role="alert"
      className={[
        "flex w-80 items-start gap-3 rounded-lg border p-4 shadow-lg",
        "transition-all duration-300",
        toast.visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
        v.wrap,
      ].join(" ")}
    >
      {/* Icon */}
      <span className={["mt-0.5 shrink-0", v.icon].join(" ")}>
        {icons[toast.variant]}
      </span>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">{toast.title}</p>
        {toast.description && (
          <p className="mt-0.5 text-xs opacity-80">{toast.description}</p>
        )}
      </div>

      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Kapat"
        className="shrink-0 rounded p-0.5 opacity-60 transition-opacity hover:opacity-100"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M18 6 6 18M6 6l12 12"/>
        </svg>
      </button>
    </div>
  );
}

// ── Hook ─────────────────────────────────────────
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}

// ── Kullanım ─────────────────────────────────────
//
// // 1. App'i sar:
// <ToastProvider>
//   <App />
// </ToastProvider>
//
// // 2. Herhangi bir bileşende:
// const { addToast } = useToast();
//
// addToast({ variant: "success", title: "Kaydedildi!", description: "Değişiklikler uygulandı." });
// addToast({ variant: "error",   title: "Hata!",       description: "Bir şeyler ters gitti." });
// addToast({ variant: "warning", title: "Dikkat!",     duration: 5000 });
// addToast({ variant: "info",    title: "Bilgi",        duration: 0 }); // duration:0 = kalıcı
