import * as v from 'valibot';

/** Client-side reservation contact fields (booking form). */
export const bookingReservationFormSchema = v.object({
	name: v.pipe(
		v.string(),
		v.trim(),
		v.minLength(1, 'Please enter your name.'),
		v.maxLength(120, 'Name is too long.')
	),
	email: v.pipe(
		v.string(),
		v.trim(),
		v.email('Please enter a valid email address.')
	),
	phone: v.pipe(
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
	)
});

export type BookingReservationFormData = v.InferOutput<typeof bookingReservationFormSchema>;

export type BookingReservationFormField = keyof BookingReservationFormData;
