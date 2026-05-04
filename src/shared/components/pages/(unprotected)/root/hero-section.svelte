<script lang="ts">
	// LIBRARIES
	import { m } from '@/shared/lib/paraglide/messages';

	// CONFIG
	import { UNPROTECTED_PAGE_ENDPOINTS } from '@/shared/constants.js';

	// COMPONENTS
	import Button from '@/shared/components/ui/button/button.svelte';

	// LUCIDE ICONS
	import ArrowRightIcon from '@lucide/svelte/icons/arrow-right';
</script>

<section
	class="w-full min-w-0 max-w-full overflow-x-clip bg-background"
	aria-labelledby="hero-heading"
>
	<div class="grid min-h-[calc(100dvh-4rem)] grid-cols-1 items-center gap-0 lg:grid-cols-2">
		<!-- Text — below image on mobile, left on desktop. Padding on lg keeps left edge aligned with the rest of the page (max-w-7xl + lg:px-8). -->
		<div class="order-2 flex flex-col justify-center px-4 py-12 sm:px-6 lg:order-1 lg:py-20 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:pr-12">
				<!-- Eyebrow -->
				<p class="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
					{m['RootPage.HeroSection.eyebrow']()}
				</p>

				<!-- H1 — Cormorant Garamond italic -->
				<h1
					id="hero-heading"
					class="font-serif mb-6 text-4xl font-medium italic leading-tight text-primary sm:text-5xl lg:text-6xl"
				>
					{m['RootPage.HeroSection.heading']()}
				</h1>

				<!-- Subtext -->
				<p class="mb-8 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
					{m['RootPage.HeroSection.subtext']()}
				</p>

				<!-- CTAs -->
				<div class="flex flex-wrap gap-3">
					<Button
						href={UNPROTECTED_PAGE_ENDPOINTS.BOOKING}
						variant="default"
						size="lg"
						class="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
					>
						<ArrowRightIcon class="size-4 shrink-0" aria-hidden="true" />
						<span>{m['RootPage.HeroSection.bookAppointment']()}</span>
					</Button>
					
					<Button
						href={UNPROTECTED_PAGE_ENDPOINTS.PORTFOLIO}
						variant="outline"
						size="lg"
						class="gap-2 border-primary text-primary hover:bg-primary/5"
					>
						<ArrowRightIcon class="size-4 shrink-0" aria-hidden="true" />
						<span>{m['RootPage.HeroSection.viewPortfolio']()}</span>
					</Button>
				</div>
			</div>

		<!-- Image — first on mobile, right on desktop. Bleeds to the viewport's right edge. -->
		<div class="order-1 lg:order-2">
			<div
				class="relative w-full overflow-hidden aspect-4/5 lg:aspect-auto lg:h-[calc(100dvh-4rem)]"
				style="max-height: calc(100dvh - 4rem);"
			>
				<img
					src="/root/hero-image-1280w.webp"
					alt="bridal makeup Valencia – Teresa Guzmán Makeup"
					class="h-full w-full object-cover object-center"
					width="750"
					height="950"
					loading="eager"
					fetchpriority="high"
				/>
				<!-- Smooth fade from page background on the left edge into the image -->
				<div
					class="pointer-events-none absolute inset-y-0 left-0 hidden w-1/3 bg-linear-to-r from-background to-transparent lg:block"
					aria-hidden="true"
				></div>
			</div>
		</div>
	</div>
</section>
