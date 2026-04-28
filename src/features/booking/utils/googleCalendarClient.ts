// SVELTEKIT IMPORTS
import { GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY } from '$env/static/private';

// LIBRARIES
import { google } from 'googleapis';

let cachedClient: ReturnType<typeof google.calendar> | null = null;

export function getGoogleCalendarClient() {
	if (cachedClient) return cachedClient;

	if (!GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY) {
		throw new Error(
			'Missing GOOGLE_CLIENT_EMAIL or GOOGLE_PRIVATE_KEY environment variables.'
		);
	}

	const auth = new google.auth.JWT({
		email: GOOGLE_CLIENT_EMAIL,
		key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
		scopes: ['https://www.googleapis.com/auth/calendar.readonly']
	});

	cachedClient = google.calendar({ version: 'v3', auth });
	return cachedClient;
}
