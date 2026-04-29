// SVELTEKIT IMPORTS
import { command } from '$app/server';
import { GOOGLE_CALENDAR_ID } from '$env/static/private';

// LIBRARIES
import { CalendarDate } from '@internationalized/date';

// CONFIG
import { BOOKING_SETTINGS } from '@/shared/config';
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

// TYPES
import type { typesApiResult } from '@/shared/types/types';
import type { typesCreateReservationData } from '../types/bookingTypes';

export const createReservation = command(
	createReservationInputSchema,
	async (payload: typesCreateReservationOutput): Promise<typesApiResult<typesCreateReservationData>> => {
		if (!GOOGLE_CALENDAR_ID) {
			return {
				success: false,
				message: 'Calendar is not configured.'
			};
		}

		const cd = new CalendarDate(
			payload.bookingDate.year,
			payload.bookingDate.month,
			payload.bookingDate.day
		);

		const slotStart = dateAtTimeMs(cd, payload.bookingTime, COMPANY_DATA.SALON_TIMEZONE);
		const slotEnd = slotStart + BOOKING_SETTINGS.SLOT_MS;

		const now = Date.now();
		if (slotEnd <= now) {
			return {
				success: false,
				message: 'This time slot has already passed.'
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
				message: 'This slot is no longer available. Please choose another time.'
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
				message: 'Could not confirm your reservation. Please try again later.'
			};
		}

		await getAvailability().refresh();

		const result: typesApiResult<typesCreateReservationData> = {
			success: true,
			message: 'Your reservation is confirmed.'
		};

		if (eventId !== undefined) {
			result.data = { eventId };
		}

		return result;
	}
);
