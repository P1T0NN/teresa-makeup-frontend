<script lang="ts">
	// LIBRARIES
	import { m } from '@/shared/lib/paraglide/messages';

	// CONFIG
	import { COMPANY_DATA } from '@/shared/constants.js';

	// COMPONENTS
	import Button from '@/shared/components/ui/button/button.svelte';
	import Section from '@/shared/components/ui/section/section.svelte';

	// LUCIDE ICONS
	import ArrowRightIcon from '@lucide/svelte/icons/arrow-right';

	const gallery = [
		{ id: 1, label: 'Bridal' },
		{ id: 2, label: 'Social look' },
		{ id: 3, label: 'Fallas makeup' },
		{ id: 4, label: 'Bridal detail' },
		{ id: 5, label: 'Special effects' },
		{ id: 6, label: 'Social look' }
	] as const;
</script>

<Section id="portfolio" yPadding="lg" ariaLabelledby="portfolio-heading">
	<div class="mb-10 text-center">
		<p class="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-secondary">{m['RootPage.PortfolioSection.eyebrow']()}</p>
		<h2
			id="portfolio-heading"
			class="font-serif text-3xl font-medium italic text-primary sm:text-4xl"
		>
			{m['RootPage.PortfolioSection.title']()}
		</h2>
	</div>

	<!--
		Editorial grid — first item is the feature (spans 2 cols × 2 rows on sm+).
		Desktop layout (sm+, 3 cols, auto-rows 260px):
		  [ feature ············ ] [ 2 ]
		  [ feature ············ ] [ 3 ]
		  [ 4 ]  [ 5 ]  [ 6 ]
		Mobile (2 cols): 3 symmetric rows of 2 squares.
	-->
	<div class="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 sm:auto-rows-[340px]">
		{#each gallery as photo, i (photo.id)}
			<div
				class="group relative overflow-hidden rounded-xl bg-muted aspect-square sm:aspect-auto sm:h-full
					{i === 0 ? 'sm:col-span-2 sm:row-span-2' : ''}"
			>
				<img
					src="/root/portfolio/{photo.id}-1280w.webp"
					alt="{photo.label.toLowerCase()} makeup Valencia – Teresa Guzmán Makeup"
					class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 {photo.id === 4 ? 'object-top' : 'object-center'}"
					loading={i === 0 ? 'eager' : 'lazy'}
					decoding="async"
				/>
			</div>
		{/each}
	</div>

	<div class="mt-10 flex justify-center">
		<Button
			href={COMPANY_DATA.INSTAGRAM_URL}
			target="_blank"
			rel="noopener noreferrer"
			variant="outline"
			size="sm"
			class="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground"
		>
			{m['RootPage.PortfolioSection.moreOnInstagram']()}
			<ArrowRightIcon class="size-3.5 text-secondary" aria-hidden="true" />
		</Button>
	</div>
</Section>
