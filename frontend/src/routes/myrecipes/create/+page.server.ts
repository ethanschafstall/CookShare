import { env } from '$env/dynamic/private';
import { recipeSchema } from '$lib/validators/schemas.js';
import { fail, redirect } from '@sveltejs/kit';
import { message, superValidate, withFiles } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod/v3';

const ALLOWED_ROLES = ['admin', 'contributor'];
const BACKEND = `http://${env.BACKEND_HOST}:${env.BACKEND_PORT}`;

/**
 * Server-only extension of the recipe schema that also accepts a list of
 * image files alongside the recipe fields. Files travel in the same
 * multipart submission and are stripped before the recipe JSON is sent
 * to the backend.
 */
const createRecipeSchema = recipeSchema.extend({
	images: z
		.array(
			z.object({
				file: z.instanceof(File),
				altText: z.string(),
				isCover: z.boolean(),
				displayOrder: z.number().int()
			})
		)
		.max(10)
		.default([])
});

export const load = async ({ parent }) => {
	const { user } = await parent();
	if (!user) redirect(303, '/login');
	if (!ALLOWED_ROLES.includes(user.role)) redirect(303, '/');

	const form = await superValidate(zod(createRecipeSchema));
	return { form };
};

export const actions = {
	default: async ({ request, cookies, fetch }) => {
		const form = await superValidate(request, zod(createRecipeSchema));
		if (!form.valid) return fail(400, withFiles({ form }));

		const token = cookies.get('session_token');
		if (!token) return message(form, 'Your session expired. Please log in again.', { status: 401 });

		const { images, ...recipeData } = form.data;

		// Step 1: create the recipe
		const recipeRes = await fetch(`${BACKEND}/api/v1/recipes`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Cookie: `session_token=${token}`
			},
			body: JSON.stringify(recipeData)
		});

		if (!recipeRes.ok) {
			const body = await recipeRes.json().catch(() => ({}));
			return message(form, body.error ?? 'Failed to create recipe', { status: 400 });
		}

		const recipe = await recipeRes.json();

		// Step 2: upload images
		if (images.length > 0) {
			const fd = new FormData();
			const metadata = images.map((img) => ({
				altText: img.altText,
				isCover: img.isCover,
				displayOrder: img.displayOrder
			}));
			fd.append('metadata', JSON.stringify(metadata));
			for (const img of images) {
				fd.append('images', img.file, img.file.name);
			}

			const imgRes = await fetch(`${BACKEND}/api/v1/recipes/${recipe.id}/images`, {
				method: 'POST',
				headers: { Cookie: `session_token=${token}` },
				body: fd
			});

			if (!imgRes.ok) {
				const body = await imgRes.json().catch(() => ({}));
				console.error('Image upload failed:', imgRes.status, body);
				return message(form, 'Recipe created but image upload failed', { status: 400 });
			}
		}
		redirect(303, `/recipes/${recipe.slug}`);
	}
};
