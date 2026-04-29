// LIBRARIES
import { CalendarDate, getLocalTimeZone, type DateValue } from '@internationalized/date';
import { getLocale } from '@/shared/lib/paraglide/runtime';

// CONFIG
import { COMPANY_DATA } from '@/shared/constants';

/**
 * UTC millisecond instant for the wall-clock `HH:mm` on `date` in IANA `timeZone`.
 * `date.toDate(tz).getTime()` already returns midnight-in-`tz` as absolute UTC ms;
 * we just add the hour/minute offset (booking slots are 10–19, well outside the
 * 02:00–03:00 DST transition where this could be off).
 */
export function dateAtTimeMs(date: DateValue, time: string, timeZone: string): number {
	const [h, m] = time.split(':').map(Number);
	return date.toDate(timeZone).getTime() + h * 3_600_000 + m * 60_000;
}

/**
 * Long calendar date for display (weekday, day, month) — uses the active UI locale from Paraglide
 * (`getLocale()`) and `timeZone` for the `CalendarDate` → `Date` mapping (default: local device zone).
 */
export function formatCalendarDateLong(
	date: { year: number; month: number; day: number },
	timeZone: string = getLocalTimeZone()
): string {
	return new CalendarDate(date.year, date.month, date.day)
		.toDate(timeZone)
		.toLocaleDateString(getLocale(), {
			weekday: 'long',
			day: 'numeric',
			month: 'long'
		});
}

/**
 * Booking status line — weekday, numeric day, short month (`en-US`), in `timeZone` (default: device local).
 */
export function formatBookingStatusDate(
	date: DateValue,
	timeZone: string = getLocalTimeZone()
): string {
	return date.toDate(timeZone).toLocaleDateString('en-US', {
		weekday: 'long',
		day: 'numeric',
		month: 'short'
	});
}

/** Wall-clock `yyyy-mm-ddTHH:mm:ss` in the salon IANA zone (`COMPANY_DATA.SALON_TIMEZONE`) for Google's `dateTime` + `timeZone`. */
export function wallSalonLocalDateTimeString(epochMs: number): string {
	const partsMap = Object.fromEntries(
		new Intl.DateTimeFormat('en-CA', {
			timeZone: COMPANY_DATA.SALON_TIMEZONE,
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			hour12: false,
			hourCycle: 'h23'
		})
			.formatToParts(new Date(epochMs))
			.filter((p) => p.type !== 'literal')
			.map((p) => [p.type, p.value] as const)
	);
	const y = partsMap.year!;
	const mo = partsMap.month!;
	const dy = partsMap.day!;
	const hh = partsMap.hour!;
	const mm = partsMap.minute!;
	const ss = partsMap.second!;
	return `${y}-${mo}-${dy}T${hh}:${mm}:${ss}`;
}

/**
 * Get current date/time
 */
export function getNow(): Date {
	return new Date();
}

/**
 * Get a date X days from now
 * @param days - Number of days to add (can be negative for past dates)
 */
export function getDaysFromNow(days: number): Date {
	return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
}

/**
 * Get a date X hours from now
 * @param hours - Number of hours to add (can be negative for past dates)
 */
export function getHoursFromNow(hours: number): Date {
	return new Date(Date.now() + hours * 60 * 60 * 1000);
}

/**
 * Get a date X minutes from now
 * @param minutes - Number of minutes to add (can be negative for past dates)
 */
export function getMinutesFromNow(minutes: number): Date {
	return new Date(Date.now() + minutes * 60 * 1000);
}

/**
 * Get a date X seconds from now
 * @param seconds - Number of seconds to add (can be negative for past dates)
 */
export function getSecondsFromNow(seconds: number): Date {
	return new Date(Date.now() + seconds * 1000);
}

/**
 * Get a date X days from a specific date
 * @param date - Base date
 * @param days - Number of days to add (can be negative for past dates)
 */
export function addDays(date: Date, days: number): Date {
	const result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
}

/**
 * Get a date X hours from a specific date
 * @param date - Base date
 * @param hours - Number of hours to add (can be negative for past dates)
 */
export function addHours(date: Date, hours: number): Date {
	const result = new Date(date);
	result.setHours(result.getHours() + hours);
	return result;
}

/**
 * Get a date X minutes from a specific date
 * @param date - Base date
 * @param minutes - Number of minutes to add (can be negative for past dates)
 */
export function addMinutes(date: Date, minutes: number): Date {
	const result = new Date(date);
	result.setMinutes(result.getMinutes() + minutes);
	return result;
}

/**
 * Check if a date is in the past
 */
export function isPast(date: Date): boolean {
	return date < getNow();
}

/**
 * Check if a date is in the future
 */
export function isFuture(date: Date): boolean {
	return date > getNow();
}

/**
 * Get the difference in days between two dates
 */
export function getDaysDifference(date1: Date, date2: Date): number {
	const diffTime = Math.abs(date1.getTime() - date2.getTime());
	return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

