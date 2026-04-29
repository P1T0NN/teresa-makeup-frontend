<script lang="ts">
	// SVELTEKIT IMPORTS
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	// LIBRARIES
	import { safeParse } from 'valibot';
	import { m } from '@/shared/lib/paraglide/messages';

	// CLASSES
	import { bookingSectionClass } from './bookingSection.svelte.ts';

	// COMPONENTS
	import { Button } from '@/shared/components/ui/button/index.js';
	import { toast } from 'svelte-sonner';
	import Spinner from '@/shared/components/ui/spinner/spinner.svelte';

	// REMOTE FUNCTIONS
	import { createReservation } from '@/features/booking/mutations/createReservation.remote';
	import { getAvailability } from '@/features/booking/queries/bookingQueries.remote';

	// UTILS
	import { valibotIssuesToFieldErrors } from '@/shared/utils/validationUtils';

	// SCHEMAS
	import { createReservationInputSchema } from '@/features/booking/schemas/bookingSchemas';

	// TYPES
	import type { typesCreateReservationData } from '@/features/booking/types/bookingTypes';
	import type { typesApiResult } from '@/shared/types/types';

	let submitting = $state(false);

	const canSubmit = $derived(
		bookingSectionClass.bookingInputs.bookingDate !== undefined &&
			bookingSectionClass.bookingInputs.bookingTime != null &&
			bookingSectionClass.bookingInputs.bookingTime !== ''
	);

	async function handleConfirmReservation() {
		const validation = safeParse(createReservationInputSchema, bookingSectionClass.bookingInputs);

		if (!validation.success) {
			bookingSectionClass.fieldErrors = valibotIssuesToFieldErrors(validation.issues);
			toast.error(validation.issues[0]?.message);
			return;
		}

		bookingSectionClass.fieldErrors = {};

		submitting = true;

		const result: typesApiResult<typesCreateReservationData> = await createReservation(validation.output)
			.updates(getAvailability())
			.finally(() => {
				submitting = false;
			});

		if (!result.success) {
			toast.error(result.message);
			return;
		}

		bookingSectionClass.clearInputs();

		await goto(resolve('/(unprotected)/reservation-confirmation'));
	}
</script>

<Button
	type="button"
	class="mt-4 w-full shadow-none"
	disabled={submitting || !canSubmit}
	onclick={handleConfirmReservation}
>
	{#if submitting}
		<Spinner />
	{/if}

	{m['RootPage.BookingSection.confirmReservation']()}
</Button>
