<script lang="ts">
	// LIBRARIES
	import { m } from '@/shared/lib/paraglide/messages';

	// CLASSES
	import { bookingSectionClass } from './bookingSection.svelte.ts';

	// COMPONENTS
	import * as Card from '@/shared/components/ui/card';
	import RadioGroupSelection from '@/shared/components/ui/radio-group-selection/radio-group-selection.svelte';

	// DATA
	import { serviceOptions } from '@/shared/data/servicesData';
	import { getServiceBookingDurationMinutes } from '@/features/booking/utils/serviceBookingDuration';

	const bookingServiceOptions = $derived(
		serviceOptions.map((o) => {
			const h = getServiceBookingDurationMinutes(o.id) / 60;
			return {
				id: o.id,
				label: o.label,
				detail: `${h}h`
			};
		})
	);
</script>

<Card.Root class="h-full gap-0 p-4 sm:p-5">
	<Card.Header class="p-0">
		<Card.Title class="text-base font-semibold text-foreground">{m['RootPage.BookingSection.selectService']()}</Card.Title>
		<Card.Description class="mt-1 text-sm text-muted-foreground">{m['RootPage.BookingSection.chooseOneOption']()}</Card.Description>
	</Card.Header>

	<Card.Content class="p-0">
		<RadioGroupSelection
			bind:value={bookingSectionClass.bookingInputs.service}
			options={bookingServiceOptions}
			ariaLabel={m['RootPage.BookingSection.serviceSelection']()}
		/>
	</Card.Content>
</Card.Root>
