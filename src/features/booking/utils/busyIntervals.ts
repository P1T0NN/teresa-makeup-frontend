// TYPES
import type { MsInterval } from './isOverlap';

export type BusyApiSlot = { start: string; end: string };

/** Maps Google Calendar API busy slots (ISO strings) to millisecond intervals. */
export function busyApiToMsIntervals(busy: readonly BusyApiSlot[]): MsInterval[] {
	return busy.map((b) => ({
		start: new Date(b.start).getTime(),
		end: new Date(b.end).getTime()
	}));
}
