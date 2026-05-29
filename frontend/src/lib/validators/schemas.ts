import { z } from 'zod/v3';

export const loginSchema = z.object({
	email: z.string().email('Invalid email address'),
	password: z.string().min(8, 'Password must not be empty'),
	rememberMe: z.boolean().default(false)
});

export const recipeSchema = z.object({
	title: z.string().min(1).max(255),
	description: z.string().min(1),
	servings: z.number().int().nullable(),
	prepTimeMin: z.number().int().nullable(),
	cookTimeMin: z.number().int().nullable(),
	difficulty: z.enum(['easy', 'medium', 'hard']),
	steps: z
		.array(
			z.object({
				stepNumber: z.number().int(),
				instruction: z.string().min(1)
			})
		)
		.min(1),
	ingredients: z
		.array(
			z.object({
				name: z.string().min(1).max(255),
				displayOrder: z.number().int(),
				quantityG: z.number().nullable(),
				quantityNumeric: z.number().nullable(),
				displayUnit: z.string().max(255).nullable(),
				note: z.string().max(255).nullable()
			})
		)
		.min(1)
});
