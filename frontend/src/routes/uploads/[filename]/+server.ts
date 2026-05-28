import { env } from '$env/dynamic/private';
import { error } from '@sveltejs/kit';
import { createReadStream } from 'fs';
import { stat } from 'fs/promises';
import { lookup } from 'mime-types';
import path from 'path';

const UPLOADS_DIR = env.UPLOADS_DIR ?? '/var/data/uploads';

export const GET = async ({ params, setHeaders }) => {
	const safe = path.basename(params.filename);
	const fullPath = path.join(UPLOADS_DIR, safe);

	if (!fullPath.startsWith(UPLOADS_DIR)) {
		throw error(400, 'Invalid path');
	}

	let info;
	try {
		info = await stat(fullPath);
	} catch {
		throw error(404, 'Not found');
	}

	setHeaders({
		'Content-Type': lookup(safe) || 'application/octet-stream',
		'Content-Length': String(info.size),
		'Cache-Control': 'public, max-age=31536000, immutable'
	});

	return new Response(createReadStream(fullPath) as any);
};
