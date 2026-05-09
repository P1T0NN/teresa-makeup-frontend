// SVELTEKIT IMPORTS
import { command } from '$app/server';
import {
	GOOGLE_CALENDAR_ID,
	RESEND_API_KEY,
	CALLMEBOT_PHONE,
	CALLMEBOT_API_KEY
} from '$env/static/private';

// LIBRARIES
import { CalendarDate } from '@internationalized/date';
import { Resend } from 'resend';
import { m } from '@/shared/lib/paraglide/messages';

// CONFIG
import { COMPANY_DATA } from '@/shared/constants';

// REMOTE FUNCTIONS
import { getAvailability } from '@/features/booking/queries/bookingQueries.remote';

// UTILS
import { buildReservationDescription } from '@/features/booking/utils/buildReservationDescription';
import { busyApiToMsIntervals } from '@/features/booking/utils/busyIntervals';
import { getBusyIntervals } from '@/features/booking/utils/getBusyIntervals';
import { getGoogleCalendarClient } from '@/features/booking/utils/googleCalendarClient';
import { isOverlap } from '@/features/booking/utils/isOverlap';
import { dateAtTimeMs, wallSalonLocalDateTimeString } from '@/shared/utils/dateUtils';

// SCHEMAS
import { createReservationInputSchema, type typesCreateReservationOutput } from '@/features/booking/schemas/bookingSchemas';

// TEMPLATES
import { buildReservationEmail } from '@/features/booking/templates/reservationEmailTemplate';
import { buildReservationWhatsappMessage } from '@/features/booking/templates/reservationWhatsappMessage';

// UTILS
import { getServiceBookingDurationMs } from '@/features/booking/utils/serviceBookingDuration';

// TYPES
import type { typesApiResult } from '@/shared/types/types';
import type { typesCreateReservationData } from '../types/bookingTypes';

export const createReservation = command(
	createReservationInputSchema,
	async (payload: typesCreateReservationOutput): Promise<typesApiResult<typesCreateReservationData>> => {
		if (!GOOGLE_CALENDAR_ID) {
			return {
				success: false,
				message: m['GenericMessages.CALENDAR_NOT_CONFIGURED']()
			};
		}

		const cd = new CalendarDate(
			payload.bookingDate.year,
			payload.bookingDate.month,
			payload.bookingDate.day
		);

		const slotStart = dateAtTimeMs(cd, payload.bookingTime, COMPANY_DATA.SALON_TIMEZONE);
		const slotEnd = slotStart + getServiceBookingDurationMs(payload.service);

		const now = Date.now();
		if (slotEnd <= now) {
			return {
				success: false,
				message: m['GenericMessages.TIME_SLOT_ALREADY_PASSED']()
			};
		}

		const dayStartUtc = cd.toDate(COMPANY_DATA.SALON_TIMEZONE);
		const nextCal = cd.add({ days: 1 });
		const nextDayStartUtc = nextCal.toDate(COMPANY_DATA.SALON_TIMEZONE);

		const busy = await getBusyIntervals(dayStartUtc, nextDayStartUtc);
		const intervals = busyApiToMsIntervals(busy);

		if (isOverlap(slotStart, slotEnd, intervals)) {
			return {
				success: false,
				message: m['GenericMessages.SLOT_NO_LONGER_AVAILABLE']()
			};
		}

		const calendar = getGoogleCalendarClient();

		let eventId: string | undefined;

		try {
			const inserted = await calendar.events.insert({
				calendarId: GOOGLE_CALENDAR_ID,
				requestBody: {
					summary: COMPANY_DATA.RESERVATION_TITLE,
					description: buildReservationDescription(payload),
					start: {
						dateTime: wallSalonLocalDateTimeString(slotStart),
						timeZone: COMPANY_DATA.SALON_TIMEZONE
					},
					end: {
						dateTime: wallSalonLocalDateTimeString(slotEnd),
						timeZone: COMPANY_DATA.SALON_TIMEZONE
					}
				},
				sendUpdates: 'none'
			});
			eventId = inserted.data?.id ?? undefined;
		} catch (e) {
			console.error('Google Calendar insert failed', e);
			return {
				success: false,
				message: m['GenericMessages.RESERVATION_NOT_CONFIRMED']()
			};
		}

		try {
			const resend = new Resend(RESEND_API_KEY);
			const { subject, html, text, replyTo } = buildReservationEmail(payload, slotStart);
			await resend.emails.send({
				from: `Reservas Web <${COMPANY_DATA.RESEND_EMAIL}>`,
				to: [COMPANY_DATA.EMAIL.trim()],
				replyTo,
				subject,
				html,
				text
			});
		} catch (e) {
			console.error('Reservation notification email failed', e);
		}

		try {
			const text = buildReservationWhatsappMessage(payload, slotStart);
			const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(CALLMEBOT_PHONE)}&text=${encodeURIComponent(text)}&apikey=${encodeURIComponent(CALLMEBOT_API_KEY)}`;
			const res = await fetch(url);
			if (!res.ok) {
				console.error('Reservation WhatsApp notification failed', res.status, await res.text());
			}
		} catch (e) {
			console.error('Reservation WhatsApp notification failed', e);
		}

		await getAvailability().refresh();

		const result: typesApiResult<typesCreateReservationData> = {
			success: true,
			message: m['GenericMessages.RESERVATION_CONFIRMED']()
		};

		if (eventId !== undefined) {
			result.data = { eventId };
		}

		return result;
	}
);
