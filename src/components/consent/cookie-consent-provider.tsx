"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type ConsentState = "unset" | "accepted" | "declined";

type CookieConsentContextValue = {
  consent: ConsentState;
  isReady: boolean;
  isBannerOpen: boolean;
  accept: () => void;
  decline: () => void;
  openSettings: () => void;
};

const STORAGE_KEY = "nagel-solutions-cookie-consent";

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentState>("unset");
  const [isReady, setIsReady] = useState(false);
  const [isBannerOpen, setIsBannerOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const storedValue = window.localStorage.getItem(STORAGE_KEY);

    if (storedValue === "accepted" || storedValue === "declined") {
      setConsent(storedValue);
      setIsBannerOpen(false);
    } else {
      setConsent("unset");
      setIsBannerOpen(true);
    }

    setIsReady(true);
  }, []);

  const accept = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, "accepted");
    }

    setConsent("accepted");
    setIsBannerOpen(false);
  };

  const decline = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, "declined");
    }

    setConsent("declined");
    setIsBannerOpen(false);
  };

  const openSettings = () => {
    setIsBannerOpen(true);
  };

  const value = useMemo(
    () => ({
      consent,
      isReady,
      isBannerOpen,
      accept,
      decline,
      openSettings,
    }),
    [consent, isReady, isBannerOpen],
  );

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);

  if (!context) {
    throw new Error("useCookieConsent must be used within CookieConsentProvider");
  }

  return {
    consent: context.consent,
    isReady: context.isReady,
    accept: context.accept,
    decline: context.decline,
    openSettings: context.openSettings,
    isBannerOpen: context.isBannerOpen,
  };
}
