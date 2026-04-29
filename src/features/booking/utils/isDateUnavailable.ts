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
	if (intervals.length === 0) {
		return () => false;
	}

	return (date: DateValue) => {
		for (const time of candidateStartTimeSlots) {
			const slotStart = dateAtTimeMs(date, time, timeZone);
			if (!isOverlap(slotStart, slotStart + slotDurationMs, intervals)) {
				return false;
			}
		}
		return true;
	};
}
