"use client";

import { Button, type ButtonProps } from "@/components/ui/button";
import type { InquiryCategory } from "@/lib/leads/inquiry";
import { useInquiryModal } from "@/components/forms/inquiry-modal-provider";

type InquiryButtonProps = Omit<ButtonProps, "asChild" | "type" | "children"> & {
  label: string;
  inquiryCategory: InquiryCategory;
  source: string;
  relatedSolutionSlug?: string;
  relatedDemoId?: string;
  onAfterOpen?: () => void;
};

export function InquiryButton({
  label,
  inquiryCategory,
  source,
  relatedSolutionSlug,
  relatedDemoId,
  onAfterOpen,
  variant = "primary",
  size = "default",
  className,
  ...props
}: InquiryButtonProps) {
  const { openInquiryModal } = useInquiryModal();

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={className}
      onClick={() => {
        openInquiryModal({
          inquiryCategory,
          source,
          label,
          relatedSolutionSlug,
          relatedDemoId,
        });
        onAfterOpen?.();
      }}
      {...props}
    >
      {label}
    </Button>
  );
}
