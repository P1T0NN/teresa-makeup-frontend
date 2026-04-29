<script lang="ts">
	// LIBRARIES
	import { getLocalTimeZone } from '@internationalized/date';

	// QUERIES
	import { getAvailability } from '@/features/booking/queries/bookingQueries.remote';

	// CLASSES
	import { bookingSectionClass } from './bookingSection.svelte.ts';

	// COMPONENTS
	import Section from '@/shared/components/ui/section/section.svelte';
	import CalendarWithTime from '@/shared/components/ui/custom-calendar/calendar-with-time.svelte';
	import CalendarWithTimeLoading from '@/shared/components/pages/(unprotected)/root/loading/calendar-with-time-loading.svelte';
	import BookingForm from './booking-form.svelte';
	import BookingServiceSelection from './booking-service-selection.svelte';

	const bookingStatusText = $derived(
		bookingSectionClass.bookingInputs.bookingDate && bookingSectionClass.bookingInputs.bookingTime
			? `Your meeting is booked for ${bookingSectionClass.bookingInputs.bookingDate
					.toDate(getLocalTimeZone())
					.toLocaleDateString('en-US', {
						weekday: 'long',
						day: 'numeric',
						month: 'short'
					})} at ${bookingSectionClass.bookingInputs.bookingTime}.`
			: 'You have not chosen the booking date yet.'
	);
</script>

<Section id="booking" yPadding="lg" class="bg-primary">
	<div class="mb-8 text-center text-primary-foreground">
		<h2 class="font-serif text-3xl font-medium italic sm:text-4xl">Book your appointment</h2>
		<p class="mt-2 text-sm text-primary-foreground/80 sm:text-base">
			Choose your service, date, and preferred time.
		</p>
		<p class="mt-4 text-xl font-semibold sm:text-2xl">{bookingStatusText}</p>
	</div>

	<div class="grid grid-cols-1 gap-6 lg:grid-cols-[3fr_2fr] lg:items-stretch">
		<svelte:boundary>
			{@const availability = await getAvailability()}

			{#snippet pending()}
				<CalendarWithTimeLoading />
			{/snippet}

			{#if availability}
				<CalendarWithTime
					busy={availability.busy}
					bind:value={bookingSectionClass.bookingInputs.bookingDate}
					bind:selectedTime={bookingSectionClass.bookingInputs.bookingTime}
				/>
			{/if}
		</svelte:boundary>

		<BookingServiceSelection />
	</div>

	<div class="mt-6">
		<BookingForm statusText={bookingStatusText} />
	</div>
</Section>
