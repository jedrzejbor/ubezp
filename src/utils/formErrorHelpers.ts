import { type FieldErrors, type FieldPath, type FieldValues } from 'react-hook-form';

export interface MuiFieldErrorProps {
  error: boolean;
  helperText?: string;
}

const getErrorMessage = (error: unknown): string | undefined => {
  if (!error || typeof error !== 'object' || !('message' in error)) {
    return undefined;
  }

  const { message } = error as { message?: unknown };

  return typeof message === 'string' ? message : undefined;
};

export const getMuiErrorProps = <TFieldValues extends FieldValues>(
  errors: FieldErrors<TFieldValues>,
  name: FieldPath<TFieldValues>
): MuiFieldErrorProps => {
  const fieldError = errors[name];
  const helperText = getErrorMessage(fieldError);

  return {
    error: Boolean(fieldError),
    helperText
  };
};
