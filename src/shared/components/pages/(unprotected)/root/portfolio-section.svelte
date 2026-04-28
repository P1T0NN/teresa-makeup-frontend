<script lang="ts">
	// COMPONENTS
	import Section from '@/shared/components/ui/section/section.svelte';

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
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-8 w-8 opacity-30"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1.5"
							d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
						/>
					</svg>
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

	<!-- TODO: Replace with Teresa's real Instagram handle once confirmed. -->
	<div class="mt-10 text-center">
		<p class="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
			More on Instagram
			<span class="ml-1 text-secondary">→</span>
		</p>
	</div>
</Section>
