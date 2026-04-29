export const PAGINATION_DATA = {
	DEFAULT_PAGE_SIZE: 1,
	/** Default for `DataTable` `optimizationStrategy` (see `DataTableOptimizationStrategy` in data-table `types.ts`). */
	DEFAULT_OPTIMIZATION_STRATEGY: 'unoptimized' as const
} as const;

export const COOKIE_NAMES = {
    SESSION_TOKEN: 'session_token',
    DEVICE_FINGERPRINT: 'device_fingerprint',
} as const;

export const RATE_LIMIT = {
    STANDARD: {
        REQUESTS_PER_WINDOW: 100,
        WINDOW_MINUTES: 1,
    },
    STRICT: {
        REQUESTS_PER_WINDOW: 20,
        WINDOW_MINUTES: 1,
    },
    AUTH: {
        REQUESTS_PER_WINDOW: 20,
        WINDOW_MINUTES: 15,
    },
} as const;

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