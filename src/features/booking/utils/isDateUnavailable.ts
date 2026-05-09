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
	const isSunday = (date: DateValue) => date.toDate(timeZone).getDay() === 0;

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
