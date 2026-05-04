<script lang="ts">
	import UserIcon from '@lucide/svelte/icons/user';

	// LIBRARIES
	import { m } from '@/shared/lib/paraglide/messages';

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
			<UserIcon class="h-20 w-20 text-muted-foreground opacity-40" strokeWidth={1.5} aria-hidden="true" />
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
