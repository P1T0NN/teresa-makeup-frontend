// CONFIG
import { BOOKING_SETTINGS } from '@/shared/config';

// DATA
import { getServiceBookingDurationMinutes } from '@/shared/data/servicesData';

// TYPES
import type { typesServiceOptionId } from '@/features/services/types/servicesTypes';

/**
 * Legal hourly start times (`HH:00`) for a booking of `durationMinutes` on the salon grid.
 * Latest end matches the existing 1h rule: last rail start (`LAST_HOUR_INCLUSIVE`) + 1 grid step.
 */
export function getBookingStartTimeSlotsForDuration(durationMinutes: number): readonly string[] {
	const lastAllowedEndMinute = (BOOKING_SETTINGS.LAST_HOUR_INCLUSIVE + 1) * 60;
	const out: string[] = [];
	for (const time of BOOKING_SETTINGS.TIME_SLOTS) {
		const h = Number(time.slice(0, 2));
		const startMinute = h * 60;
		if (startMinute + durationMinutes <= lastAllowedEndMinute) {
			out.push(time);
		}
	}
	return out;
}

export function getBookingStartTimeSlotsForService(
	serviceId: typesServiceOptionId
): readonly string[] {
	return getBookingStartTimeSlotsForDuration(getServiceBookingDurationMinutes(serviceId));
}
