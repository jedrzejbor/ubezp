import { zodResolver } from '@hookform/resolvers/zod';
import { type Resolver, type UseFormProps, useForm } from 'react-hook-form';
import { type z } from 'zod';

export const useZodForm = <TSchema extends z.ZodTypeAny>(
  schema: TSchema,
  options?: Omit<UseFormProps<z.infer<TSchema>>, 'resolver'>
) =>
  useForm<z.infer<TSchema>>({
    resolver: zodResolver(schema) as unknown as Resolver<z.infer<TSchema>>,
    mode: 'onBlur',
    reValidateMode: 'onChange',
    ...options
  });
