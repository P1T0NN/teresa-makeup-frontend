// UTILS
import { dateAtTimeMs } from '@/shared/utils/dateUtils';
import { isOverlap, type MsInterval } from './isOverlap';

// TYPES
import type { DateValue } from '@internationalized/date';

/**
 * Returns a predicate: `true` when every `timeSlots` slot on that calendar day overlaps a busy interval
 * (whole day treated as unavailable for booking).
 */
export function createIsDateUnavailable(
	timeSlots: readonly string[],
	intervals: readonly MsInterval[],
	timeZone: string,
	slotDurationMs: number
): (date: DateValue) => boolean {
	if (intervals.length === 0) {
		return () => false;
	}

	return (date: DateValue) => {
		for (const time of timeSlots) {
			const slotStart = dateAtTimeMs(date, time, timeZone);
			if (!isOverlap(slotStart, slotStart + slotDurationMs, intervals)) {
				return false;
			}
		}
		return true;
	};
}
