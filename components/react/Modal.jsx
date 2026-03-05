// ================================================
// startup-ui — Modal Component (React)
// Features: ESC kapat, backdrop click, focus trap,
//           scroll lock, portal (createPortal)
// Accessibility: role=dialog, aria-modal, aria-labelledby
// ================================================

import { useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
}) {
  const panelRef = useRef(null);

  const sizes = {
    sm:   "max-w-sm",
    md:   "max-w-md",
    lg:   "max-w-lg",
    xl:   "max-w-xl",
    full: "max-w-full",
  };

  // ESC ile kapat
  const handleKey = useCallback(
    (e) => { if (e.key === "Escape") onClose(); },
    [onClose]
  );

  useEffect(() => {
    if (!open) return;

    // Scroll lock
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKey);

    // Focus trap — ilk odaklanabilir elemente git
    const focusable = panelRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable?.length) focusable[0].focus();

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKey);
    };
  }, [open, handleKey]);

  if (!open) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby={description ? "modal-desc" : undefined}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className={[
          "relative w-full rounded-xl border border-neutral-200 bg-white shadow-xl",
          "dark:border-neutral-800 dark:bg-neutral-900",
          sizes[size],
        ].join(" ")}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4 dark:border-neutral-800">
          <h2
            id="modal-title"
            className="text-base font-semibold text-neutral-900 dark:text-neutral-100"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Kapat"
            className="rounded-md p-1 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-4">
          {description && (
            <p
              id="modal-desc"
              className="mb-4 text-sm text-neutral-600 dark:text-neutral-400"
            >
              {description}
            </p>
          )}
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-2 border-t border-neutral-200 px-6 py-4 dark:border-neutral-800">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

// ── Kullanım örneği ──────────────────────────────
//
// const [open, setOpen] = useState(false);
//
// <button onClick={() => setOpen(true)}>Aç</button>
//
// <Modal
//   open={open}
//   onClose={() => setOpen(false)}
//   title="Başlık"
//   description="Açıklama metni."
//   footer={
//     <>
//       <button onClick={() => setOpen(false)}>İptal</button>
//       <button onClick={handleConfirm}>Onayla</button>
//     </>
//   }
// >
//   <p>Modal içeriği buraya gelir.</p>
// </Modal>
