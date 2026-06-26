<script lang="ts">
	// LIBRARIES
	import { m } from '@/shared/lib/paraglide/messages';

	// COMPONENTS
	import Section from '@/shared/components/ui/section/section.svelte';
</script>

<Section id="about" surface="muted" yPadding="lg" ariaLabelledby="about-heading">
	<div class="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
		<div class="mx-auto aspect-square w-full max-w-md overflow-hidden rounded-2xl lg:mx-0">
			<img
				src="/root/about-me/about-me-1280w.webp"
				alt="Teresa Guzmán, professional makeup artist in Valencia"
				class="h-full w-full object-cover"
				loading="lazy"
				decoding="async"
			/>
		</div>

		<div class="w-full min-w-0 text-left">
			<p class="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
				{m['RootPage.AboutMeSection.eyebrow']()}
			</p>
			<h2
				id="about-heading"
				class="font-serif mb-6 text-3xl font-medium italic text-primary sm:text-4xl"
			>
				{m['RootPage.AboutMeSection.title']()}
			</h2>

			<p class="text-base leading-relaxed text-foreground/70">
				<!-- TODO: Replace with Teresa's real bio -->
				{m['RootPage.AboutMeSection.bio1']()}
			</p>

			<p class="mt-3 text-base leading-relaxed text-foreground/70">
				<!-- TODO: Replace with Teresa's real story/differentiator -->
				{m['RootPage.AboutMeSection.bio2']()}
			</p>
		</div>
	</div>
</Section>
