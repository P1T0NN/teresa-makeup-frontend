// LIBRARIES
import { initBotId } from 'botid/client/core';

export function init() {
	if (!import.meta.env.PROD) return;

	initBotId({
		protect: [
			{ path: '/_app/remote/*', method: 'POST' }
		]
	});
}
