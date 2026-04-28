// UTILS
import { dateAtTimeMs } from '@/shared/utils/dateUtils';
import { isOverlap, type MsInterval } from './isOverlap';

// TYPES
import type { DateValue } from '@internationalized/date';

/** Time strings (`HH:mm`) that overlap a busy interval on the selected date. */
export function buildBusyTimesForSelectedDate(
	selectedDate: DateValue | undefined,
	timeSlots: readonly string[],
	intervals: readonly MsInterval[],
	timeZone: string,
	slotDurationMs: number
): string[] {
	if (!selectedDate || intervals.length === 0) return [];

	const out: string[] = [];
	for (const time of timeSlots) {
		const slotStart = dateAtTimeMs(selectedDate, time, timeZone);
		if (isOverlap(slotStart, slotStart + slotDurationMs, intervals)) {
			out.push(time);
		}
	}
	return out;
}
