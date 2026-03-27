import { ZodError } from "zod";
import type { ActionResult, FieldErrors } from "@/lib/types/actions";

export function toNullableString(value: unknown) {
  if (typeof value !== "string") {
    return value;
  }

  const trimmed = value.trim();
  return trimmed === "" ? null : trimmed;
}

export function toOptionalString(value: unknown) {
  if (typeof value !== "string") {
    return value;
  }

  return value.trim();
}

export function objectFromFormData(formData: FormData) {
  const result: Record<string, FormDataEntryValue | FormDataEntryValue[]> = {};

  for (const [key, value] of formData.entries()) {
    const currentValue = result[key];

    if (currentValue === undefined) {
      result[key] = value;
      continue;
    }

    if (Array.isArray(currentValue)) {
      currentValue.push(value);
      continue;
    }

    result[key] = [currentValue, value];
  }

  return result;
}

export function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred.";
}

export function getZodFieldErrors(error: ZodError): FieldErrors {
  const flattened = error.flatten().fieldErrors;

  const fieldErrors: FieldErrors = {};

  for (const [key, value] of Object.entries(flattened)) {
    fieldErrors[key] = Array.isArray(value) ? value : [];
  }

  return fieldErrors;
}

export function validationErrorResult<TData = never>(
  error: ZodError,
): ActionResult<TData> {
  return {
    success: false,
    message: "Please review the submitted fields.",
    fieldErrors: getZodFieldErrors(error),
  };
}
