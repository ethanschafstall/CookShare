import { BACKEND_HOST, BACKEND_PORT } from '$env/static/private';
import { error, fail, redirect } from '@sveltejs/kit';

const BACKEND = `http://${BACKEND_HOST}:${BACKEND_PORT}`;

export const load = async ({ params, cookies, fetch }) => {
	const token = cookies.get('session_token');

	const res = await fetch(`${BACKEND}/api/v1/recipes/${params.slug}`, {
		headers: token ? { Cookie: `session_token=${token}` } : {}
	});

	if (res.status === 404) error(404, 'Recipe not found');
	if (!res.ok) error(500, 'Failed to load recipe');
	const recipe = await res.json();
	return { recipe };
};

export const actions = {
	delete: async ({ params, cookies, fetch }) => {
		const token = cookies.get('session_token');
		if (!token) return fail(401, { message: 'Session expired' });

		const slug = params.slug;
		const urlId = slug.split('-').pop();

		const res = await fetch(`${BACKEND}/api/v1/recipes/${urlId}`, {
			method: 'DELETE',
			headers: { Cookie: `session_token=${token}` }
		});

		if (!res.ok) {
			return fail(res.status, { message: 'Failed to delete recipe' });
		}

		throw redirect(303, '/myrecipes');
	}
};
