<script lang="ts">
	// COMPONENTS
	import Section from '@/shared/components/ui/section/section.svelte';
</script>

<Section id="about" surface="muted" yPadding="lg" ariaLabelledby="about-heading">
	<div class="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
		<!-- TODO: Replace placeholder with Teresa's real headshot photo.
		     Photo: portrait or professional shot, aspect-ratio square or 3/4.
		     Alt text: "Teresa Guzmán, professional makeup artist in Valencia" -->
		<div
			class="mx-auto flex aspect-square w-full max-w-md items-center justify-center rounded-2xl bg-border lg:mx-0"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-20 w-20 text-muted-foreground opacity-40"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="1.5"
					d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
				/>
			</svg>
		</div>

		<div class="w-full min-w-0 text-left">
			<p class="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
				The artist
			</p>
			<h2
				id="about-heading"
				class="font-serif mb-6 text-3xl font-medium italic text-primary sm:text-4xl"
			>
				About
			</h2>

			<p class="text-base leading-relaxed text-foreground/70">
				<!-- TODO: Replace with Teresa's real bio -->
				Professional makeup artist with more than X years of experience specializing in bridal
				and social makeup in Valencia. Trained in the latest techniques, with a strong focus on
				longevity and skin care.
			</p>

			<p class="mt-3 text-base leading-relaxed text-foreground/70">
				<!-- TODO: Replace with Teresa's real story/differentiator -->
				My philosophy: every face is unique, every glance matters. I love creating looks that
				enhance your natural beauty and help you feel like yourself on the moments that matter
				most.
			</p>
		</div>
	</div>
</Section>
