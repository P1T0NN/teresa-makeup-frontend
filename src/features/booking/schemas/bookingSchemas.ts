// LIBRARIES
import { CalendarDate } from '@internationalized/date';
import * as v from 'valibot';

// CONFIG
import { BOOKING_SETTINGS } from '@/shared/config';

// DATA
import { serviceOptionIds } from '@/shared/data/servicesData';

const serviceFieldSchema = v.picklist(serviceOptionIds, 'Please select a service.');

const nameFieldSchema = v.pipe(
	v.string(),
	v.trim(),
	v.minLength(1, 'Please enter your name.'),
	v.maxLength(120, 'Name is too long.')
);

const emailFieldSchema = v.pipe(
	v.string(),
	v.trim(),
	v.email('Please enter a valid email address.')
);

const phoneFieldSchema = v.pipe(
	v.string(),
	v.trim(),
	v.union([
		v.literal(''),
		v.pipe(
			v.string(),
			v.minLength(5, 'Phone number looks too short.'),
			v.maxLength(32, 'Phone number is too long.'),
			v.regex(/^[\d\s+().-]+$/, 'Use only digits and common phone symbols.')
		)
	])
);

const bookingCalendarDatePartsSchema = v.object({
	year: v.pipe(v.number(), v.integer()),
	month: v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(12)),
	day: v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(31))
});

export const bookingCalendarDateSchema = v.pipe(
	bookingCalendarDatePartsSchema,
	v.check(
		({ year, month, day }) => {
			try {
				const d = new CalendarDate(year, month, day);
				return d.year === year && d.month === month && d.day === day;
			} catch {
				return false;
			}
		},
		'Please pick a valid date.'
	)
);

const bookingTimeSlotSchema = v.pipe(
	v.string(),
	v.check(
		(t) => (BOOKING_SETTINGS.TIME_SLOTS as readonly string[]).includes(t),
		'Please pick a valid time slot.'
	)
);

/** Date + time as selected in the booking UI (required; null/undefined fail with a clear message). */
const bookingDateFieldSchema = v.pipe(
	v.any(),
	v.check(
		(input) =>
			input != null &&
			typeof input === 'object' &&
			!Array.isArray(input) &&
			'year' in (input as object) &&
			'month' in (input as object) &&
			'day' in (input as object),
		'Please select a date.'
	),
	bookingCalendarDateSchema
);

const bookingTimeFieldSchema = v.pipe(
	v.any(),
	v.check(
		(input) => input != null && input !== '' && typeof input === 'string',
		'Please select a time.'
	),
	bookingTimeSlotSchema
);

/** Canonical booking payload (`createReservation` + booking UI). */
export const createReservationInputSchema = v.object({
	name: nameFieldSchema,
	email: emailFieldSchema,
	phone: phoneFieldSchema,
	service: serviceFieldSchema,
	bookingDate: bookingDateFieldSchema,
	bookingTime: bookingTimeFieldSchema
});

export type typesCreateReservationInput = v.InferInput<typeof createReservationInputSchema>;
export type typesCreateReservationOutput = v.InferOutput<typeof createReservationInputSchema>;