<script lang="ts">
	import Section from '@/shared/components/ui/section/section.svelte';
	import Button from '@/shared/components/ui/button/button.svelte';
	import {
		Card,
		CardContent,
		CardFooter,
		CardHeader,
		CardTitle,
		CardDescription,
	} from '@/shared/components/ui/card';

	const services = [
		{
			id: 'bridal',
			title: 'Bridal makeup',
			description:
				'A personalized bridal look with long-wear skin prep for the whole day. Includes a preview trial, style consultation, and support up to the wedding.',
			icon: '💍',
		},
		{
			id: 'social',
			title: 'Social makeup',
			description:
				'For events, guest weddings, graduations, and any special occasion when you want to look flawless.',
			icon: '✨',
		},
		{
			id: 'treatments',
			title: 'Treatments',
			description:
				'Facial cleansing, maderotherapy, microneedling, and lymphatic drainage for radiant skin as the perfect base.',
			icon: '🌿',
		},
	] as const;
</script>

<Section id="services" surface="muted" yPadding="lg" ariaLabelledby="services-heading">
	<!-- Section header -->
	<div class="mb-12 text-center">
		<p class="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
			What I offer
		</p>
		<h2
			id="services-heading"
			class="font-serif text-3xl font-medium italic text-primary sm:text-4xl"
		>
			Services
		</h2>
	</div>

	<!-- Cards grid -->
	<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each services as service (service.id)}
			<Card class="flex flex-col border-[#d6c3ae] bg-[#f2e6d8] shadow-none transition-shadow duration-300 hover:shadow-md">
				<CardHeader class="pb-3">
					<div class="mb-3 text-3xl">{service.icon}</div>
					<CardTitle class="font-serif text-xl font-medium italic text-primary">
						{service.title}
					</CardTitle>
				</CardHeader>
				<CardContent class="flex-1">
					<CardDescription class="text-sm leading-relaxed text-foreground/70">
						{service.description}
					</CardDescription>
				</CardContent>
				<CardFooter class="pt-4">
					<!-- TODO: Pre-select the corresponding service in the booking section
					     when navigating from this card. Implement via URL param:
					     href="/#booking?service={service.id}" — read it in booking-section.svelte. -->
					<Button
						href={`/?service=${service.id}#booking`}
						variant="default"
						class="w-full bg-primary text-primary-foreground hover:bg-primary/90"
					>
						Book →
					</Button>
				</CardFooter>
			</Card>
		{/each}
	</div>
</Section>
