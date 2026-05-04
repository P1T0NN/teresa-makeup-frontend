// TYPES
import type { typesServiceOptionId } from '@/features/services/types/servicesTypes';

// DATA
import { SERVICE_BOOKING_DURATION_MINUTES } from '@/shared/data/servicesData';

export function getServiceBookingDurationMinutes(id: typesServiceOptionId): number {
	return SERVICE_BOOKING_DURATION_MINUTES[id];
}

export function getServiceBookingDurationMs(id: typesServiceOptionId): number {
	return getServiceBookingDurationMinutes(id) * 60_000;
}
