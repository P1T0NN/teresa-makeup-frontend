// SVELTEKIT IMPORTS
import { query } from '$app/server';

// UTILS
import { getBusyIntervals } from '@/features/booking/utils/getBusyIntervals';

const DAY_MS = 24 * 60 * 60 * 1000;
const HORIZON_DAYS = 90;

export const getAvailability = query(async () => {
	const from = new Date();
	const to = new Date(from.getTime() + HORIZON_DAYS * DAY_MS);

	const busy = await getBusyIntervals(from, to);

	return { busy };
});
