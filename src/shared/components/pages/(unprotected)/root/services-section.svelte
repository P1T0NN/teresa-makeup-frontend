<script lang="ts">
	// CONFIG
	import { UNPROTECTED_PAGE_ENDPOINTS } from '@/shared/constants.js';

	// DATA
	import { homepageServicesSection } from '@/shared/data/servicesData';

	// COMPONENTS
	import Section from '@/shared/components/ui/section/section.svelte';
	import Button from '@/shared/components/ui/button/button.svelte';
</script>

<Section id="services" surface="muted" yPadding="lg" ariaLabelledby="services-heading">
	<!-- Section header -->
	<div class="mb-16 text-center">
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

	<!-- Editorial numbered list -->
	<div class="mx-auto max-w-5xl">
		{#each homepageServicesSection as service (service.id)}
			<div class="group border-t border-secondary/20">
				<div class="grid grid-cols-1 gap-y-3 py-10 lg:grid-cols-[4rem_1fr_2fr] lg:gap-x-10 lg:py-12">
					<!-- Ordinal -->
					<span
						class="font-serif text-sm font-medium tracking-[0.2em] text-secondary/50"
						aria-hidden="true"
					>
						{service.ordinal}
					</span>

					<!-- Title -->
					<h3
						class="font-serif text-2xl font-medium italic text-primary transition-colors duration-300 group-hover:text-secondary sm:text-3xl"
					>
						{service.title}
					</h3>

					<!-- Description -->
					<p class="max-w-prose text-sm leading-relaxed text-foreground/60 lg:pt-1.5">
						{service.description}
					</p>
				</div>
			</div>
		{/each}
		<div class="border-t border-secondary/20"></div>
	</div>

	<!-- Single global CTA -->
	<div class="mt-16 text-center">
		<Button
			href={UNPROTECTED_PAGE_ENDPOINTS.BOOKING}
			variant="default"
			size="lg"
			class="bg-primary px-10 text-primary-foreground hover:bg-primary/90"
		>
			Book Appointment
		</Button>
	</div>
</Section>
