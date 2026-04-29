<script lang="ts">
	// CLASSES
	import { bookingSectionClass } from './bookingSection.svelte.ts';

	// COMPONENTS
	import * as Card from '@/shared/components/ui/card';
	import RadioGroupSelection from '@/shared/components/ui/radio-group-selection/radio-group-selection.svelte';

	// DATA
	import { serviceOptions } from '@/shared/data/servicesData';
</script>

<Card.Root class="h-full gap-0 p-4 sm:p-5">
	<Card.Header class="p-0">
		<Card.Title class="text-base font-semibold text-foreground">Select service</Card.Title>
		<Card.Description class="mt-1 text-sm text-muted-foreground">Choose one option</Card.Description>
	</Card.Header>

	<Card.Content class="p-0">
		<RadioGroupSelection
			bind:value={bookingSectionClass.bookingInputs.service}
			options={serviceOptions}
			ariaLabel="Service selection"
		/>
	</Card.Content>
</Card.Root>
