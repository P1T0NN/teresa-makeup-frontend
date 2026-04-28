<script lang="ts">
	// SVELTEKIT IMPORTS
	import { page } from '$app/state';

	// COMPONENTS
	import * as Card from '@/shared/components/ui/card';
	import RadioGroupSelection from '@/shared/components/ui/radio-group-selection/radio-group-selection.svelte';

	// DATA
	import { serviceOptions } from '@/shared/data/servicesData';

	// TYPES
	import type { typesServiceOptionId } from '@/features/services/types/servicesTypes';

	const serviceMap: Record<string, typesServiceOptionId> = {
		bridal: 'bridal-trial',
		social: 'social-makeup',
		treatments: 'facial-cleansing'
	};

	let selectedService = $state<typesServiceOptionId>(
		serviceMap[page.url.searchParams.get('service') ?? ''] ?? 'bridal-trial'
	);
</script>

<Card.Root class="h-full gap-0 p-4 sm:p-5">
	<Card.Header class="p-0">
		<Card.Title class="text-base font-semibold text-foreground">Select service</Card.Title>
		<Card.Description class="mt-1 text-sm text-muted-foreground">Choose one option</Card.Description>
	</Card.Header>

	<Card.Content class="p-0">
		<RadioGroupSelection bind:value={selectedService} options={serviceOptions} ariaLabel="Service selection" />
	</Card.Content>
</Card.Root>
