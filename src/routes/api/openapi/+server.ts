import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import { prepareDatabase } from '$lib/utils/db';
import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export const PUT: RequestHandler = async ({ request, url }) => {
	if (!env.API_TOKEN) {
		error(
			403,
			'API_TOKEN must be defined in the environment variables before using this endpoint.'
		);
	}
	if (url.searchParams.get('apiToken') !== env.API_TOKEN) {
		error(403, 'Invalid API token.');
	}

	const data = await request.json();
	await prepareDatabase(data);

	return json({});
};