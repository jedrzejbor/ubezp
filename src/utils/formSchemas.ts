import { z } from 'zod';

const emailField = z.string().min(1, '').email('Błędny adres email');

const passwordField = z
  .string()
  .min(1, 'Te pola nie mogą być puste')
  .min(8, 'Hasło musi mieć co najmniej 8 znaków');

export const loginSchema = z.object({
  email: emailField,
  password: passwordField
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z.object({
  email: emailField
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    code: z.string().min(6, 'Kod resetujący powinien mieć co najmniej 6 znaków'),
    password: passwordField,
    confirmPassword: z.string().min(1, 'Potwierdź nowe hasło')
  })
  .refine((values) => values.password === values.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Hasła muszą się zgadzać'
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export const profileSchema = z.object({
  firstName: z.string().min(1, 'Imię jest wymagane').min(2, 'Imię musi mieć co najmniej 2 znaki'),
  lastName: z
    .string()
    .min(1, 'Nazwisko jest wymagane')
    .min(2, 'Nazwisko musi mieć co najmniej 2 znaki'),
  email: emailField,
  phone: z
    .string()
    .min(1, 'Numer telefonu jest wymagany')
    .regex(/^[0-9+() -]{7,20}$/, 'Podaj prawidłowy numer telefonu'),
  currentPassword: z.string().min(8, 'Hasło musi mieć co najmniej 8 znaków').optional()
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

// Account data edit form schema
export const editAccountDataSchema = z.object({
  firstName: z.string().min(1, 'Imię jest wymagane').min(2, 'Imię musi mieć co najmniej 2 znaki'),
  lastName: z
    .string()
    .min(1, 'Nazwisko jest wymagane')
    .min(2, 'Nazwisko musi mieć co najmniej 2 znaki'),
  email: emailField,
  phone: z
    .string()
    .min(1, 'Numer telefonu jest wymagany')
    .regex(/^[0-9+() -]{7,20}$/, 'Podaj prawidłowy numer telefonu')
});

export type EditAccountDataFormValues = z.infer<typeof editAccountDataSchema>;

// Change password form schema
export const changePasswordSchema = z
  .object({
    currentPassword: passwordField,
    newPassword: passwordField,
    confirmNewPassword: z.string().min(1, 'Potwierdź nowe hasło')
  })
  .refine((values) => values.newPassword === values.confirmNewPassword, {
    path: ['confirmNewPassword'],
    message: 'Hasła muszą się zgadzać'
  });

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
