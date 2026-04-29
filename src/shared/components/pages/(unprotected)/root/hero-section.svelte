<script lang="ts">
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
	<div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid min-h-[calc(100dvh-4rem)] grid-cols-1 items-center gap-0 lg:grid-cols-2">
			<!-- Text — below image on mobile, left on desktop -->
			<div class="order-2 flex flex-col justify-center py-12 pr-0 lg:order-1 lg:py-20 lg:pr-12">
				<!-- Eyebrow -->
				<p class="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
					Bridal specialist · Valencia
				</p>

				<!-- H1 — Cormorant Garamond italic -->
				<h1
					id="hero-heading"
					class="font-serif mb-6 text-4xl font-medium italic leading-tight text-primary sm:text-5xl lg:text-6xl"
				>
					Your beauty, on the most important day of your life
				</h1>

				<!-- Subtext -->
				<p class="mb-8 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
					Custom makeup, long-wear skin prep, and refined techniques — from the trial to the big day.
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
						<span>Book Appointment</span>
					</Button>
					
					<Button
						href={UNPROTECTED_PAGE_ENDPOINTS.PORTFOLIO}
						variant="outline"
						size="lg"
						class="gap-2 border-primary text-primary hover:bg-primary/5"
					>
						<ArrowRightIcon class="size-4 shrink-0" aria-hidden="true" />
						<span>View portfolio</span>
					</Button>
				</div>
			</div>

			<!-- Image — first on mobile, right on desktop -->
			<div class="order-1 lg:order-2">
				<div
					class="relative w-full overflow-hidden lg:h-[calc(100dvh-4rem)]"
					style="aspect-ratio: 4/5; max-height: calc(100dvh - 4rem);"
				>
					<div class="flex h-full w-full items-center justify-center px-4 text-center">
						<p class="text-muted-foreground text-sm sm:text-base">Here goes image min. 1500px wide</p>
					</div>
					<!--
					<img
						src="/images/hero-bridal.jpg"
						alt="bridal makeup Valencia – Teresa Guzmán Makeup"
						class="h-full w-full object-cover object-top"
						width="750"
						height="950"
						loading="eager"
						fetchpriority="high"
					/>
					-->
				</div>
			</div>
		</div>
	</div>
</section>
