import { env } from '$env/dynamic/private';

export const load = async ({ cookies, fetch }) => {
	const token = cookies.get('session_token');
	if (!token) return { user: null };

	const url = `http://${env.BACKEND_HOST}:${env.BACKEND_PORT}/api/v1/auth/me`;
	const res = await fetch(url, {
		headers: { Cookie: `session_token=${token}` }
	});
	const user = await res.json();
	return { user };
};
