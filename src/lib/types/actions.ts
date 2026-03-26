export type FieldErrors = Record<string, string[]>;

export type ActionResult<TData = undefined> = {
  success: boolean;
  message: string;
  data?: TData;
  fieldErrors?: FieldErrors;
};
