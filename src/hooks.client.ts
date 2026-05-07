// LIBRARIES
import { initBotId } from 'botid/client/core';

export function init() {
	initBotId({
		protect: [
			// SvelteKit remote functions are POSTed to an internal /_app/remote/* path.
			// If DevTools shows a different URL, narrow this pattern accordingly.
			{ path: '/_app/remote/*', method: 'POST' }
		]
	});
}
