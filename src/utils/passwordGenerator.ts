/**
 * Password generator utility that creates secure passwords
 * meeting application security standards
 */

const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const DIGITS = '0123456789';
const SPECIAL = '!@#$%^&*()_+-=[]{}|;:,.<>?';

/**
 * Generates a secure random password
 * @param length - Password length (default 10, min 8)
 * @returns Generated password string
 */
export function generateSecurePassword(length = 10): string {
  const minLength = Math.max(length, 8);

  // Ensure at least one of each required character type
  const result: string[] = [
    LOWERCASE[Math.floor(Math.random() * LOWERCASE.length)],
    UPPERCASE[Math.floor(Math.random() * UPPERCASE.length)],
    DIGITS[Math.floor(Math.random() * DIGITS.length)],
    SPECIAL[Math.floor(Math.random() * SPECIAL.length)]
  ];

  // Fill remaining length with random characters from all sets
  const allChars = LOWERCASE + UPPERCASE + DIGITS + SPECIAL;
  for (let i = result.length; i < minLength; i++) {
    result.push(allChars[Math.floor(Math.random() * allChars.length)]);
  }

  // Shuffle the result
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result.join('');
}

/**
 * Validates if a password meets security requirements
 * @param password - Password to validate
 * @returns Object with isValid flag and any error messages
 */
export function validatePassword(password: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Hasło musi mieć co najmniej 8 znaków');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Hasło musi zawierać małą literę');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Hasło musi zawierać wielką literę');
  }

  if (!/[0-9]/.test(password)) {
    errors.push('Hasło musi zawierać cyfrę');
  }

  if (!/[!@#$%^&*()_+\-=[\]{}|;:,.<>?]/.test(password)) {
    errors.push('Hasło musi zawierać znak specjalny');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
