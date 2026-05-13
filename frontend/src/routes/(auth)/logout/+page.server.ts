import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ cookies }) => {
		cookies.delete('session_token', { path: '/' });
		redirect(303, '/');
	}
};
