// SVELTEKIT IMPORTS
import { sequence } from '@sveltejs/kit/hooks';

// LIBRARIES
import { paraglideMiddleware } from '@/shared/lib/paraglide/server';

// UTILS
import { getSecurityHeaders, getHstsHeader } from '@/shared/utils/securityHeaders.js';

// TYPES
import type { Handle } from '@sveltejs/kit';

// Security headers handle - adds security headers to all responses
const securityHeadersHandle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);

	// Add security headers to all responses
	const headers = getSecurityHeaders();
	for (const [key, value] of Object.entries(headers)) {
		response.headers.set(key, value);
	}

	// HSTS header (only on HTTPS)
	if (event.url.protocol === 'https:') {
		response.headers.set('Strict-Transport-Security', getHstsHeader());
	}

	return response;
};

// Paraglide middleware handle
const paraglideHandle: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request: localizedRequest, locale }) => {
		event.request = localizedRequest;
		return resolve(event, {
			transformPageChunk: ({ html }) => {
				return html.replace('%lang%', locale);
			}
		});
	});

// Paraglide first (de-localize request for matchers); then security headers
export const handle: Handle = sequence(paraglideHandle, securityHeadersHandle);
