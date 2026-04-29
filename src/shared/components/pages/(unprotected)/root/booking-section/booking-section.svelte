<script lang="ts">
	// LIBRARIES
	import { m } from '@/shared/lib/paraglide/messages';

	// CLASSES
	import { bookingSectionClass } from './bookingSection.svelte.ts';

	// COMPONENTS
	import Section from '@/shared/components/ui/section/section.svelte';
	import CalendarWithTime from '@/shared/components/ui/custom-calendar/calendar-with-time.svelte';
	import CalendarWithTimeLoading from '@/shared/components/pages/(unprotected)/root/loading/calendar-with-time-loading.svelte';
	import BookingForm from './booking-form.svelte';
	import BookingServiceSelection from './booking-service-selection.svelte';

	// REMOTE FUNCTIONS
	import { getAvailability } from '@/features/booking/queries/bookingQueries.remote';

	// UTILS
	import { formatBookingStatusDate } from '@/shared/utils/dateUtils';

	const bookingStatusText = $derived(
		bookingSectionClass.bookingInputs.bookingDate && bookingSectionClass.bookingInputs.bookingTime
			? `${m['RootPage.BookingSection.yourMeetingIsBookedFor']()} ${formatBookingStatusDate(
					bookingSectionClass.bookingInputs.bookingDate
				)} ${m['RootPage.BookingSection.at']()} ${bookingSectionClass.bookingInputs.bookingTime}.`
			: m['RootPage.BookingSection.youHaveNotChosenTheBookingDateYet']()
	);
</script>

<Section id="booking" yPadding="lg" class="bg-primary">
	<div class="mb-8 text-center text-primary-foreground">
		<h2 class="font-serif text-3xl font-medium italic sm:text-4xl">{m['RootPage.BookingSection.bookYourAppointment']()}</h2>
		<p class="mt-2 text-sm text-primary-foreground/80 sm:text-base">
			{m['RootPage.BookingSection.chooseYourServiceDateAndPreferredTime']()}
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
					service={bookingSectionClass.bookingInputs.service}
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
