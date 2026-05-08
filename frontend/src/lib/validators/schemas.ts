import { z } from 'zod/v3';

export const loginSchema = z.object({
	email: z.string().email('Invalid email address'),
	password: z.string().min(8, 'Password must not be empty')
});
