// ================================================
// startup-ui — Dropdown Component (React)
// Features: keyboard nav, outside click close, ESC
// Accessibility: role=menu, aria-expanded, aria-haspopup
// ================================================

import { useState, useRef, useEffect, useCallback } from "react";

export function Dropdown({ trigger, items, align = "left" }) {
  const [open, setOpen]     = useState(false);
  const wrapperRef          = useRef(null);
  const menuRef             = useRef(null);

  const alignClass = align === "right" ? "right-0" : "left-0";

  // Dışarı tıklayınca kapat
  useEffect(() => {
    function handleClick(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // ESC ile kapat
  const handleKey = useCallback((e) => {
    if (!open) return;
    const menuItems = menuRef.current?.querySelectorAll('[role="menuitem"]');
    const arr       = menuItems ? [...menuItems] : [];
    const idx       = arr.indexOf(document.activeElement);

    if (e.key === "Escape")   { setOpen(false); }
    if (e.key === "ArrowDown"){ e.preventDefault(); arr[(idx + 1) % arr.length]?.focus(); }
    if (e.key === "ArrowUp")  { e.preventDefault(); arr[(idx - 1 + arr.length) % arr.length]?.focus(); }
  }, [open]);

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  // Açılınca ilk iteme focus
  useEffect(() => {
    if (open) {
      const first = menuRef.current?.querySelector('[role="menuitem"]');
      first?.focus();
    }
  }, [open]);

  return (
    <div ref={wrapperRef} className="relative inline-block">
      {/* Trigger — render prop */}
      <div onClick={() => setOpen((v) => !v)} aria-haspopup="menu" aria-expanded={open}>
        {typeof trigger === "function" ? trigger(open) : trigger}
      </div>

      {/* Menu */}
      {open && (
        <ul
          ref={menuRef}
          role="menu"
          className={[
            "absolute z-50 mt-1 min-w-[10rem] rounded-lg border border-neutral-200 bg-white py-1 shadow-lg",
            "dark:border-neutral-800 dark:bg-neutral-900",
            alignClass,
          ].join(" ")}
        >
          {items.map((item, i) =>
            item.separator ? (
              <li key={i} role="separator" className="my-1 border-t border-neutral-200 dark:border-neutral-800" />
            ) : (
              <li key={i} role="none">
                <button
                  role="menuitem"
                  tabIndex={-1}
                  disabled={item.disabled}
                  onClick={() => { item.onClick?.(); setOpen(false); }}
                  className={[
                    "flex w-full items-center gap-2 px-3 py-2 text-sm transition-colors",
                    "focus:outline-none",
                    item.danger
                      ? "text-red-600 hover:bg-red-50 focus:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                      : "text-neutral-700 hover:bg-neutral-100 focus:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800",
                    item.disabled && "pointer-events-none opacity-40",
                  ].filter(Boolean).join(" ")}
                >
                  {item.icon && <span aria-hidden="true" className="text-neutral-400">{item.icon}</span>}
                  {item.label}
                  {item.shortcut && (
                    <kbd className="ml-auto text-xs text-neutral-400">{item.shortcut}</kbd>
                  )}
                </button>
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
}

// ── Kullanım örneği ──────────────────────────────
//
// const items = [
//   { label: "Düzenle", icon: <EditIcon />, onClick: () => {} },
//   { label: "Kopyala", icon: <CopyIcon />, shortcut: "⌘C", onClick: () => {} },
//   { separator: true },
//   { label: "Sil", icon: <TrashIcon />, danger: true, onClick: () => {} },
// ];
//
// <Dropdown
//   trigger={(open) => (
//     <button>Seçenekler {open ? "▲" : "▼"}</button>
//   )}
//   items={items}
// />
