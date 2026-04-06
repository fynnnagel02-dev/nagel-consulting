"use client";

import { useSyncExternalStore } from "react";
import { Reveal } from "@/components/motion/reveal";
import { SectionShell } from "@/components/layout/section-shell";

export function HomeHeroSection() {
  const isSafari = useSyncExternalStore(
    () => () => {},
    () => {
      const ua = window.navigator.userAgent;
      return /Safari/i.test(ua) && !/Chrome|Chromium|CriOS|Edg|OPR|Firefox|FxiOS/i.test(ua);
    },
    () => false,
  );

  return (
    <SectionShell
      spacing="default"
      className="overflow-hidden pt-3 sm:pt-5 lg:pt-6 lg:pb-20"
    >
      <HeroStage animated={!isSafari} />
    </SectionShell>
  );
}

function HeroStage({ animated }: { animated: boolean }) {
  const copyIntroClass = animated ? "hero-copy-intro" : "";
  const headlineClass = animated
    ? "hero-base-headline hero-base-headline--animated"
    : "hero-base-headline";

  return (
    <div className="hero-stage hero-stage-open relative mx-auto min-h-[calc(100svh-8rem)] w-[min(1680px,calc(100vw-1.75rem))] overflow-visible px-3 pb-6 pt-2 sm:w-[min(1700px,calc(100vw-2.5rem))] sm:px-5 lg:min-h-[calc(100svh-8.5rem)] lg:px-8 lg:pb-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_28%_30%,rgba(255,255,255,0.8),transparent_19%),radial-gradient(circle_at_12%_18%,rgba(141,106,66,0.14),transparent_22%),radial-gradient(circle_at_78%_24%,rgba(62,76,94,0.1),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.12),transparent_42%,rgba(36,51,69,0.02)_100%)]" />
      <div className="hero-grid pointer-events-none absolute inset-x-[18%] bottom-[10%] top-[22%] hidden opacity-24 lg:block" />
      <div className="hero-orb hero-orb-left pointer-events-none absolute left-[-7rem] top-[24%] hidden h-[22rem] w-[22rem] rounded-full border border-[rgba(141,106,66,0.09)] lg:block" />
      <div className="hero-orb hero-orb-right pointer-events-none absolute right-[-9rem] top-[11%] hidden h-[18rem] w-[18rem] rounded-full bg-[radial-gradient(circle,rgba(36,51,69,0.1),rgba(36,51,69,0))] blur-3xl lg:block" />

      <div className="relative grid min-h-[calc(100svh-8rem)] items-center gap-8 pt-10 lg:min-h-[calc(100svh-8.5rem)] lg:grid-cols-[1.02fr,0.98fr] lg:gap-12 lg:pt-8 xl:grid-cols-[1.06fr,0.94fr]">
        <div className="hero-dark-pocket pointer-events-none absolute right-[5%] top-[20%] hidden h-[23rem] w-[39%] rounded-[3rem] lg:block xl:w-[36%]" />
        <div className="hero-panel-float hero-panel-float-a pointer-events-none absolute left-[9%] top-[21%] hidden h-20 w-32 rounded-[1.35rem] border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.18)] xl:block" />

        <div className="relative z-10 mx-auto flex w-full max-w-[52rem] flex-col items-center text-center lg:mx-0 lg:max-w-[52rem] lg:items-start lg:pr-6 lg:text-left xl:max-w-[58rem]">
          <div
            className={`${copyIntroClass} inline-flex items-center gap-3 rounded-full border border-[rgba(36,51,69,0.08)] bg-[rgba(255,252,247,0.84)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--color-accent)] shadow-[var(--shadow-crisp)] backdrop-blur`}
          >
            <span className="h-2 w-2 rounded-full bg-[var(--color-accent)]" />
            Struktur fur operative Ablaufe
          </div>

          <div className="relative mt-6 w-full max-w-[64rem]">
            <div className="hero-message-glow pointer-events-none absolute left-1/2 top-[42%] hidden h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.92),rgba(255,255,255,0))] blur-2xl lg:block lg:left-[34%]" />
            <h1
              className={`relative mx-auto font-display text-[3.1rem] font-medium leading-[0.9] text-[var(--color-text)] sm:text-[4rem] lg:mx-0 lg:max-w-none lg:text-[4.5rem] xl:text-[4.82rem] ${headlineClass}`}
            >
              <span className="block lg:whitespace-nowrap">
                Aus Excel-basierten Prozessen werden
              </span>
              <span className="mt-1 block lg:whitespace-nowrap">
                strukturierte Webanwendungen.
              </span>
            </h1>
            {animated ? (
              <div
                aria-hidden="true"
                className="hero-intro-overlay pointer-events-none absolute inset-0 z-20"
              >
                <h1 className="relative mx-auto font-display text-[3.1rem] font-medium leading-[0.9] text-[var(--color-text)] sm:text-[4rem] lg:mx-0 lg:max-w-none lg:text-[4.5rem] xl:text-[4.82rem]">
                  <span className="block lg:whitespace-nowrap">
                    <span className="hero-word hero-word-aus inline-block">Aus</span>{" "}
                    <span className="hero-word hero-word-excel inline-block">Excel-basierten</span>{" "}
                    <span className="hero-word hero-word-prozesse inline-block">Prozessen</span>{" "}
                    <span className="hero-word hero-word-werden inline-block">werden</span>
                  </span>
                  <span className="mt-1 block lg:whitespace-nowrap">
                    <span className="hero-word hero-word-strukturierte inline-block">strukturierte</span>{" "}
                    <span className="hero-word hero-word-webapps inline-block">Webanwendungen.</span>
                  </span>
                </h1>
              </div>
            ) : null}
          </div>

          <p
            className={`${copyIntroClass} mt-7 max-w-[42rem] text-[1rem] leading-8 text-[var(--color-muted)] sm:text-[1.08rem] lg:max-w-[40rem] xl:max-w-[43rem]`}
          >
            Nagel Solutions entwickelt digitale Arbeitsabläufe für Handwerksbetriebe,
            Dienstleister und operative KMU, wenn Listen, Papierwege und informelle
            Abstimmung im Alltag nicht mehr tragen.
          </p>

          <div
            className={`${copyIntroClass} mt-7 w-full max-w-[44rem] rounded-[1.45rem] border border-[rgba(36,51,69,0.08)] bg-[rgba(255,252,247,0.78)] px-5 py-4 shadow-[var(--shadow-crisp)]`}
          >
            <div className="grid gap-4 text-left sm:grid-cols-[0.92fr,1.08fr] sm:items-start">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--color-accent)]">
                  Wirkung
                </div>
                <p className="mt-2 text-sm leading-7 text-[var(--color-text)]">
                  Klare Zuständigkeiten, nachvollziehbare Statuswechsel und eine belastbare
                  Datenbasis schaffen Ruhe im operativen Alltag.
                </p>
              </div>
              <div className="border-t border-[rgba(36,51,69,0.08)] pt-4 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
                <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--color-accent)]">
                  Einsatz
                </div>
                <p className="mt-2 text-sm leading-7 text-[var(--color-text)]">
                  Für Unternehmen, die ihren Betrieb digital ordnen wollen, ohne in
                  generische Softwarelogik gepresst zu werden.
                </p>
              </div>
            </div>
          </div>
        </div>

        {animated ? (
          <Reveal delay={0.52} y={18}>
            <div className="hidden lg:block" aria-hidden="true" />
          </Reveal>
        ) : (
          <div className="hidden lg:block" aria-hidden="true" />
        )}
      </div>
    </div>
  );
}
