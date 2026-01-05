import { z } from 'zod';

const emailField = z
  .string({ required_error: 'Adres e-mail jest wymagany' })
  .email('Podaj prawidłowy adres e-mail');

const passwordField = z
  .string({ required_error: 'Hasło jest wymagane' })
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
    code: z
      .string({ required_error: 'Kod resetujący jest wymagany' })
      .min(6, 'Kod resetujący powinien mieć co najmniej 6 znaków'),
    password: passwordField,
    confirmPassword: z.string({ required_error: 'Potwierdź nowe hasło' })
  })
  .refine((values) => values.password === values.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Hasła muszą się zgadzać'
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export const profileSchema = z.object({
  firstName: z
    .string({ required_error: 'Imię jest wymagane' })
    .min(2, 'Imię musi mieć co najmniej 2 znaki'),
  lastName: z
    .string({ required_error: 'Nazwisko jest wymagane' })
    .min(2, 'Nazwisko musi mieć co najmniej 2 znaki'),
  email: emailField,
  phone: z
    .string({ required_error: 'Numer telefonu jest wymagany' })
    .regex(/^[0-9+() -]{7,20}$/, 'Podaj prawidłowy numer telefonu'),
  currentPassword: z.string().min(8, 'Hasło musi mieć co najmniej 8 znaków').optional()
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
