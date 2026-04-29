<script lang="ts">
	// CONFIG
	import { COMPANY_DATA } from '@/shared/constants.js';

	// COMPONENTS
	import Button from '@/shared/components/ui/button/button.svelte';
	import Section from '@/shared/components/ui/section/section.svelte';

	// LUCIDE ICONS
	import ArrowRightIcon from '@lucide/svelte/icons/arrow-right';
	import ImageIcon from '@lucide/svelte/icons/image';

	// TODO: Replace placeholders with Teresa's real portfolio photos.
	// Labels match the types Teresa requested: bridal, social, Fallas, special effects.
	// Format: JPG or WebP, no Instagram filters, min 800px wide.
	// Alt text pattern: "[label] makeup Valencia – Teresa Guzmán Makeup"
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
		<p class="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-secondary">My work</p>
		<h2
			id="portfolio-heading"
			class="font-serif text-3xl font-medium italic text-primary sm:text-4xl"
		>
			Portfolio
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
	<div class="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 sm:auto-rows-[260px]">
		{#each gallery as photo, i (photo.id)}
			<div
				class="group relative overflow-hidden rounded-xl bg-muted aspect-square sm:aspect-auto sm:h-full
					{i === 0 ? 'sm:col-span-2 sm:row-span-2' : ''}"
			>
				<!--
					Replace this block with the real <img> when photos are ready:
					<img
						src="/images/portfolio/{photo.id}.jpg"
						alt="{photo.label.toLowerCase()} makeup Valencia – Teresa Guzmán Makeup"
						class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
						loading="{i === 0 ? 'eager' : 'lazy'}"
						decoding="async"
					/>
				-->
				<div class="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground">
					<ImageIcon class="h-8 w-8 opacity-30" strokeWidth={1.5} aria-hidden="true" />
					<span class="text-xs font-medium opacity-40">{photo.label}</span>
				</div>

				<!-- Category label fades in on hover -->
				<div
					class="absolute inset-0 flex items-end bg-linear-to-t from-primary/70 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
					aria-hidden="true"
				>
					<p class="font-serif text-sm italic text-primary-foreground">{photo.label}</p>
				</div>
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
			More on Instagram
			<ArrowRightIcon class="size-3.5 text-secondary" aria-hidden="true" />
		</Button>
	</div>
</Section>
