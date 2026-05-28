import { env } from '$env/dynamic/private';
import { error } from '@sveltejs/kit';

const BACKEND = `http://${env.BACKEND_HOST}:${env.BACKEND_PORT}`;

export const load = async ({ params, cookies, fetch }) => {
	const token = cookies.get('session_token');

	const res = await fetch(`${BACKEND}/api/v1/recipes/${params.slug}`, {
		headers: token ? { Cookie: `session_token=${token}` } : {}
	});

	if (res.status === 404) error(404, 'Recipe not found');
	if (!res.ok) error(500, 'Failed to load recipe');
	const recipe = await res.json();
	return {
		recipe: {
			...recipe,
			images: recipe.images.map((img) => ({
				...img,
				storagePath: `/uploads/${img.filename}`
			}))
		}
	};
};
