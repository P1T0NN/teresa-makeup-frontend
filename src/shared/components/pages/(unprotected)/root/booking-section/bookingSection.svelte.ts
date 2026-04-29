// TYPES
import type { typesCreateReservationInput } from '@/features/booking/schemas/bookingSchemas';
import type { FieldErrors } from '@/shared/types/types';

class BookingSectionClass {
	public fieldErrors = $state<FieldErrors>({});

	public bookingInputs = $state<typesCreateReservationInput>({
		name: '',
		email: '',
		phone: '',
		service: 'bridal-trial',
		bookingDate: undefined,
		bookingTime: ''
	});

	clearInputs() {
		this.bookingInputs = {
			name: '',
			email: '',
			phone: '',
			service: 'bridal-trial',
			bookingDate: undefined,
			bookingTime: ''
		};
		this.fieldErrors = {};
	}
}

export const bookingSectionClass = new BookingSectionClass();
