/** Keeps `TIME_SLOTS` aligned with `FIRST_*` / `LAST_*` without duplicating numbers. */
const bookingHourRange = { first: 10, lastInclusive: 19 } as const;

/** Booking grid in `calendar-with-time.svelte` and server `createReservation`. */
export const BOOKING_SETTINGS = {
	FIRST_HOUR: bookingHourRange.first,
	LAST_HOUR_INCLUSIVE: bookingHourRange.lastInclusive,
	SLOT_MINUTES: 60,
	SLOT_MS: 60 * 60 * 1000,
	TIME_SLOTS: Array.from(
		{ length: bookingHourRange.lastInclusive - bookingHourRange.first + 1 },
		(_, i) =>
			`${(bookingHourRange.first + i).toString().padStart(2, '0')}:00`
	) as readonly string[]
} as const;