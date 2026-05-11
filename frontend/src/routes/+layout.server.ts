import { BACKEND_HOST, BACKEND_PORT } from '$env/static/private';

export const load = async ({ cookies, fetch }) => {
	const token = cookies.get('session_token');
	if (!token) return { user: null };

	const res = await fetch(`http://${BACKEND_HOST}:${BACKEND_PORT}/api/v1/auth/me`, {
		headers: { Authorization: `Bearer ${token}` }
	});
	if (!res.ok) return { user: null };

	const user = await res.json();
	return { user };
};
