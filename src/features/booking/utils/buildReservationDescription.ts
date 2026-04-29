// DATA
import { serviceOptions } from '@/shared/data/servicesData';

// TYPES
import type { typesServiceOptionId } from '@/features/services/types/servicesTypes';

/** Contact lines for Google Calendar event description. */
export function buildReservationDescription(payload: {
	name: string;
	email: string;
	phone: string;
	service: typesServiceOptionId;
}): string {
	const serviceLabel =
		serviceOptions.find((s) => s.id === payload.service)?.label ?? payload.service;
	const lines = [`Service: ${serviceLabel}`, `Name: ${payload.name}`, `Email: ${payload.email}`];
	if (payload.phone.trim()) {
		lines.push(`Phone: ${payload.phone.trim()}`);
	}
	return lines.join('\n');
}
