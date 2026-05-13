import { BACKEND_HOST, BACKEND_PORT } from '$env/static/private';
import { loginSchema } from '$lib/validators/schemas.js';
import { fail, redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async ({ parent: getParent }) => {
	const { user } = await getParent();
	if (user) redirect(302, '/');
	const form = await superValidate(zod(loginSchema));
	return { form };
};

export const actions = {
	default: async ({ request, fetch, cookies }) => {
		const form = await superValidate(request, zod(loginSchema));
		if (!form.valid) return fail(400, { form });

		const response = await fetch(`http://${BACKEND_HOST}:${BACKEND_PORT}/api/v1/auth/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(form.data)
		});
		if (!response.ok) {
			const body = await response.json();
			return message(form, body.error ?? 'Login failed', { status: 400 });
		}
		const setCookie = response.headers.get('set-cookie');
		if (setCookie) {
			const token = setCookie.split(';')[0].split('=')[1];
			cookies.set('session_token', token, {
				path: '/',
				expires: form.data.rememberMe ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) : undefined
			});
		}
		redirect(303, '/');
	}
};
