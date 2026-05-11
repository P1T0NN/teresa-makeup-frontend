// LIBRARIES
import { getDayOfWeek } from '@internationalized/date';

// UTILS
import { dateAtTimeMs } from '@/shared/utils/dateUtils';
import { isOverlap, type MsInterval } from './isOverlap';

// TYPES
import type { DateValue } from '@internationalized/date';

/**
 * Returns a predicate: `true` when every **candidate start** in `timeSlots` has
 * `[slotStart, slotStart + slotDurationMs)` overlapping a busy interval (no full
 * appointment window is free that day).
 */
export function createIsDateUnavailable(
	candidateStartTimeSlots: readonly string[],
	intervals: readonly MsInterval[],
	timeZone: string,
	slotDurationMs: number
): (date: DateValue) => boolean {
	// Day-of-week is intrinsic to the calendar date — must NOT depend on the
	// viewer's runtime timezone. en-US makes Sunday index 0.
	const isSunday = (date: DateValue) => getDayOfWeek(date, 'en-US') === 0;

	if (intervals.length === 0) {
		return (date: DateValue) => isSunday(date);
	}

	return (date: DateValue) => {
		if (isSunday(date)) return true;
		for (const time of candidateStartTimeSlots) {
			const slotStart = dateAtTimeMs(date, time, timeZone);
			if (!isOverlap(slotStart, slotStart + slotDurationMs, intervals)) {
				return false;
			}
		}
		return true;
	};
}
