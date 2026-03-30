"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { XIcon } from "@/components/ui/icons";
import { ContactForm } from "@/components/forms/contact-form";
import type { InquiryCategory } from "@/lib/leads/inquiry";

type InquiryModalConfig = {
  inquiryCategory: InquiryCategory;
  source: string;
  label?: string;
  relatedSolutionSlug?: string;
  relatedDemoId?: string;
};

type InquiryModalContextValue = {
  openInquiryModal: (config: InquiryModalConfig) => void;
  closeInquiryModal: () => void;
};

const InquiryModalContext = createContext<InquiryModalContextValue | null>(null);

export function InquiryModalProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<InquiryModalConfig | null>(null);
  const lastActiveElementRef = useRef<HTMLElement | null>(null);

  const openInquiryModal = useCallback((nextConfig: InquiryModalConfig) => {
    if (typeof document !== "undefined") {
      lastActiveElementRef.current = document.activeElement as HTMLElement | null;
    }

    setConfig(nextConfig);
  }, []);

  const closeInquiryModal = useCallback(() => {
    setConfig(null);

    if (typeof window !== "undefined") {
      window.setTimeout(() => {
        lastActiveElementRef.current?.focus();
      }, 0);
    }
  }, []);

  const value = useMemo(
    () => ({ openInquiryModal, closeInquiryModal }),
    [openInquiryModal, closeInquiryModal],
  );

  return (
    <InquiryModalContext.Provider value={value}>
      {children}
      <InquiryModal config={config} onClose={closeInquiryModal} />
    </InquiryModalContext.Provider>
  );
}

export function useInquiryModal() {
  const context = useContext(InquiryModalContext);

  if (!context) {
    throw new Error("useInquiryModal must be used within InquiryModalProvider");
  }

  return context;
}

function InquiryModal({
  config,
  onClose,
}: {
  config: InquiryModalConfig | null;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const isOpen = Boolean(config);

  useEffect(() => {
    if (!isOpen || typeof document === "undefined") {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!isOpen || !dialog) {
      return;
    }

    const focusable = getFocusableElements(dialog);
    focusable[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const elements = getFocusableElements(dialog);
      if (elements.length === 0) {
        return;
      }

      const first = elements[0];
      const last = elements[elements.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey && activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!config) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[60] overflow-y-auto bg-[rgba(31,41,55,0.42)] p-4 backdrop-blur-[2px]"
      aria-hidden={false}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="flex min-h-[100dvh] items-start justify-center py-4 sm:items-center sm:py-8">
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="inquiry-modal-title"
          className="w-full max-w-3xl rounded-[32px] border border-[var(--color-border)] bg-white shadow-[var(--shadow-panel)]"
        >
          <div className="flex items-start justify-between gap-6 border-b border-[var(--color-border)] px-6 py-5 sm:px-8">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">
                Anfrage
              </p>
              <h2
                id="inquiry-modal-title"
                className="font-display text-3xl text-[var(--color-text)]"
              >
                Beratung direkt anfragen
              </h2>
              <p className="max-w-2xl text-sm leading-7 text-[var(--color-muted)]">
                Beschreiben Sie kurz Ihr Anliegen. Die passende Anfrageart ist
                bereits vorausgewählt, kann aber jederzeit angepasst werden.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] bg-white text-[var(--color-text)] transition hover:bg-[var(--color-background)]"
              aria-label="Anfrage schließen"
            >
              <XIcon className="size-5" />
            </button>
          </div>

          <div className="max-h-[calc(100dvh-3rem)] overflow-y-auto px-6 py-6 sm:px-8 sm:py-8">
            <ContactForm
              initialInquiryCategory={config.inquiryCategory}
              source={config.source}
              relatedSolutionSlug={config.relatedSolutionSlug}
              relatedDemoId={config.relatedDemoId}
              submitLabel={config.label ?? "Anfrage stellen"}
              onSuccess={onClose}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function getFocusableElements(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter(
    (element) =>
      !element.hasAttribute("disabled") &&
      element.getAttribute("aria-hidden") !== "true",
  );
}
