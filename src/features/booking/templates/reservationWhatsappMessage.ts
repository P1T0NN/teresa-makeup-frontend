// CONFIG
import { COMPANY_DATA } from '@/shared/constants';

// DATA
import { serviceOptions } from '@/shared/data/servicesData';

// TYPES
import type { typesCreateReservationOutput } from '@/features/booking/schemas/bookingSchemas';

export function buildReservationWhatsappMessage(
	payload: typesCreateReservationOutput,
	slotStartMs: number
): string {
	const serviceLabel =
		serviceOptions.find((s) => s.id === payload.service)?.label ?? payload.service;

	const slotFormatted = new Date(slotStartMs).toLocaleString('es-ES', {
		timeZone: COMPANY_DATA.SALON_TIMEZONE,
		dateStyle: 'full',
		timeStyle: 'short'
	});

	const lines = [
		`*Nueva reserva — ${COMPANY_DATA.NAME}*`,
		'',
		`*Servicio:* ${serviceLabel}`,
		`*Fecha y hora:* ${slotFormatted}`,
		'',
		`*Nombre:* ${payload.name}`,
		`*Correo:* ${payload.email}`
	];

	if (payload.phone.trim()) {
		lines.push(`*Teléfono:* ${payload.phone.trim()}`);
	}

	return lines.join('\n');
}
