// SVELTEKIT IMPORTS
import { GOOGLE_CALENDAR_ID } from '$env/static/private';

// LIBRARIES
import { CalendarDateTime } from '@internationalized/date';

// CONSTANTS
import { SALON_TIMEZONE } from '@/shared/constants';

// UTILS
import { getGoogleCalendarClient } from './googleCalendarClient';

export type BusyInterval = { start: string; end: string };

const WALL_CLOCK_RE = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/;

/**
 * Lists busy intervals from Google Calendar and reinterprets each event's wall clock as
 * `SALON_TIMEZONE`, regardless of the timezone the owner used when creating the event.
 *
 * `freebusy.query` only returns absolute UTC instants (no source tz metadata), so we use
 * `events.list` instead and read the wall time directly from `start.dateTime` / `end.dateTime`.
 * That lets the owner type "4pm" anywhere in the world and still block 4pm at the salon.
 */
export async function getBusyIntervals(timeMin: Date, timeMax: Date): Promise<BusyInterval[]> {
	if (!GOOGLE_CALENDAR_ID) {
		throw new Error('Missing GOOGLE_CALENDAR_ID environment variable.');
	}

	const client = getGoogleCalendarClient();

	const response = await client.events.list({
		calendarId: GOOGLE_CALENDAR_ID,
		timeMin: timeMin.toISOString(),
		timeMax: timeMax.toISOString(),
		singleEvents: true,
		orderBy: 'startTime',
		showDeleted: false,
		maxResults: 2500
	});

	const events = response.data.items ?? [];

	return events.flatMap((event) => {
		if (event.status === 'cancelled' || event.transparency === 'transparent') return [];

		if (event.start?.date && event.end?.date) {
			const start = allDayBoundaryToMs(event.start.date);
			const end = allDayBoundaryToMs(event.end.date);
			if (start === null || end === null) return [];
			return [{ start: new Date(start).toISOString(), end: new Date(end).toISOString() }];
		}

		if (!event.start?.dateTime || !event.end?.dateTime) return [];

		const start = wallClockToSalonMs(event.start.dateTime);
		const end = wallClockToSalonMs(event.end.dateTime);
		if (start === null || end === null) return [];

		return [{ start: new Date(start).toISOString(), end: new Date(end).toISOString() }];
	});
}

function wallClockToSalonMs(iso: string): number | null {
	const match = iso.match(WALL_CLOCK_RE);
	if (!match) return null;
	const [, y, mo, d, h, mi, s] = match.map(Number);
	return new CalendarDateTime(y, mo, d, h, mi, s).toDate(SALON_TIMEZONE).getTime();
}

function allDayBoundaryToMs(dateStr: string): number | null {
	const parts = dateStr.split('-').map(Number);
	if (parts.length !== 3 || parts.some((n) => Number.isNaN(n))) return null;
	const [y, mo, d] = parts;
	return new CalendarDateTime(y, mo, d, 0, 0, 0).toDate(SALON_TIMEZONE).getTime();
}
