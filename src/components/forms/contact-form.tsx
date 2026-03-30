"use client";

import type { ReactNode } from "react";
import { useActionState, useEffect, useState } from "react";
import { submitInquiryLead } from "@/app/actions/leads";
import type { ActionResult } from "@/lib/types/actions";
import {
  defaultInquiryCategory,
  inquiryCategoryOptions,
  type InquiryCategory,
} from "@/lib/leads/inquiry";
import { Button } from "@/components/ui/button";
import { FormSelect } from "@/components/ui/form-select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const initialState: ActionResult = {
  success: false,
  message: "",
};

export function ContactForm({
  initialInquiryCategory = defaultInquiryCategory,
  source = "kontaktseite",
  relatedSolutionSlug,
  relatedDemoId,
  submitLabel = "Anfrage stellen",
  onSuccess,
}: {
  initialInquiryCategory?: InquiryCategory;
  source?: string;
  relatedSolutionSlug?: string;
  relatedDemoId?: string;
  submitLabel?: string;
  onSuccess?: () => void;
}) {
  const [consent, setConsent] = useState(true);
  const [inquiryCategory, setInquiryCategory] = useState<InquiryCategory>(
    initialInquiryCategory,
  );
  const [state, formAction, pending] = useActionState(
    async (_previousState: ActionResult, formData: FormData) => {
      return submitInquiryLead(formData);
    },
    initialState,
  );

  useEffect(() => {
    setInquiryCategory(initialInquiryCategory);
  }, [initialInquiryCategory]);

  useEffect(() => {
    if (!state.success || !onSuccess) {
      return;
    }

    const timeout = window.setTimeout(() => {
      onSuccess();
    }, 1400);

    return () => window.clearTimeout(timeout);
  }, [onSuccess, state.success]);

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="source" value={source} />
      {relatedSolutionSlug ? (
        <input
          type="hidden"
          name="related_solution_slug"
          value={relatedSolutionSlug}
        />
      ) : null}
      {relatedDemoId ? (
        <input type="hidden" name="related_demo_id" value={relatedDemoId} />
      ) : null}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Vorname" name="first_name" error={state.fieldErrors?.first_name?.[0]}>
          <Input id="first_name" name="first_name" autoComplete="given-name" required />
        </Field>
        <Field label="Nachname" name="last_name" error={state.fieldErrors?.last_name?.[0]}>
          <Input id="last_name" name="last_name" autoComplete="family-name" required />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Unternehmen" name="company_name" error={state.fieldErrors?.company_name?.[0]}>
          <Input id="company_name" name="company_name" autoComplete="organization" required />
        </Field>
        <Field label="E-Mail" name="email" error={state.fieldErrors?.email?.[0]}>
          <Input id="email" name="email" type="email" autoComplete="email" required />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Telefon" name="phone" error={state.fieldErrors?.phone?.[0]}>
          <Input id="phone" name="phone" autoComplete="tel" />
        </Field>
        <Field
          label="Branche"
          name="industry"
          error={state.fieldErrors?.industry?.[0]}
        >
          <Input id="industry" name="industry" />
        </Field>
      </div>

      <Field
        label="Anfrageart"
        name="inquiry_category"
        error={state.fieldErrors?.inquiry_category?.[0]}
      >
        <FormSelect
          name="inquiry_category"
          value={inquiryCategory}
          onValueChange={(value) => setInquiryCategory(value as InquiryCategory)}
          options={inquiryCategoryOptions.map((option) => ({
            value: option.value,
            label: option.label,
          }))}
        />
      </Field>

      <Field
        label="Welchen Ablauf oder welches Anliegen möchten Sie besprechen?"
        name="process_to_digitize"
        error={state.fieldErrors?.process_to_digitize?.[0]}
      >
        <Textarea
          id="process_to_digitize"
          name="process_to_digitize"
          required
          placeholder="Beschreiben Sie kurz den aktuellen Ablauf oder Ihr Anliegen und wo heute Reibung entsteht."
        />
      </Field>

      <Field label="Zusätzliche Informationen" name="message" error={state.fieldErrors?.message?.[0]}>
        <Textarea
          id="message"
          name="message"
          placeholder="Gibt es bereits bestehende Werkzeuge, besondere Anforderungen oder einen gewünschten Zeitrahmen?"
        />
      </Field>

      <label className="flex items-start gap-3 rounded-[22px] border border-[var(--color-border)] bg-[var(--color-background)] p-4 text-sm leading-7 text-[var(--color-muted)]">
        <input
          type="checkbox"
          name="consent_privacy"
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
          className="mt-1 size-4 rounded border-[var(--color-border)] text-[var(--color-primary)]"
          required
        />
        <span>
          Ich habe die Datenschutzhinweise gelesen und stimme der Verarbeitung
          meiner Angaben zur Bearbeitung der Anfrage zu.
        </span>
      </label>

      <div className="space-y-3">
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? "Anfrage wird gesendet..." : submitLabel}
        </Button>
        {state.message ? (
          <p
            className={state.success ? "text-sm text-green-700" : "text-sm text-rose-700"}
          >
            {state.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="text-sm font-medium text-[var(--color-text)]">
        {label}
      </label>
      {children}
      {error ? <p className="text-sm text-rose-700">{error}</p> : null}
    </div>
  );
}
