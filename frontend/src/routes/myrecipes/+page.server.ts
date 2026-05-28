import { env } from '$env/dynamic/private';
import { error, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

const BACKEND = `http://${env.BACKEND_HOST}:${env.BACKEND_PORT}`;

export const load: PageServerLoad = async ({ parent, cookies, fetch }) => {
	const { user } = await parent();
	const token = cookies.get('session_token');

	if (!token || !user) {
		throw redirect(303, '/login');
	}

	const res = await fetch(`${BACKEND}/api/v1/recipes/user/${user.id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Cookie: `session_token=${token}`
		}
	});

	if (!res.ok) {
		throw error(res.status, 'Failed to load recipes');
	}

	const backendRecipes = await res.json();
	const recipes = backendRecipes.map((r: any) => {
		const cover = r.images?.find((img: any) => img.isCover) ?? r.images?.[0];
		return {
			urlId: r.urlId,
			slug: r.slug,
			title: r.title,
			coverImage: cover ? `/uploads/${cover.filename}` : null,
			cookTimeMin: r.cookTimeMin,
			servings: r.servings,
			hits: r.hits
		};
	});

	return { recipes };
};
export const actions = {
	delete: async ({ request, cookies, fetch }) => {
		const token = cookies.get('session_token');
		const data = await request.formData();
		const urlId = data.get('urlId');

		if (!token) return fail(401, { message: 'Session expired' });
		if (!urlId) return fail(400, { message: 'Missing recipe id' });

		const res = await fetch(`${BACKEND}/api/v1/recipes/${urlId}`, {
			method: 'DELETE',
			headers: {
				Cookie: `session_token=${token}`
			}
		});

		if (!res.ok) {
			const body = await res.text();
			console.error('Delete failed:', res.status, body);
			return fail(res.status, { message: 'Failed to delete recipe' });
		}
		return { success: true };
	}
};
