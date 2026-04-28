<script lang="ts">
	import Button from '@/shared/components/ui/button/button.svelte';
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
						href="/#booking"
						variant="default"
						size="lg"
						class="bg-primary text-primary-foreground hover:bg-primary/90"
					>
						→ Book bridal trial
					</Button>
					<Button
						href="/#gallery"
						variant="outline"
						size="lg"
						class="border-primary text-primary hover:bg-primary/5"
					>
						View portfolio
					</Button>
				</div>
			</div>

			<!-- Image — first on mobile, right on desktop -->
			<div class="order-1 lg:order-2">
				<div
					class="relative w-full overflow-hidden bg-muted lg:h-[calc(100dvh-4rem)]"
					style="aspect-ratio: 4/5; max-height: calc(100dvh - 4rem);"
				>
					<!-- TODO: Replace with Teresa's real hero photo (magazine spread p.2).
					     Minimum width: 1500px. Alt text below is correct for SEO. -->
					<div class="flex h-full w-full items-center justify-center bg-muted text-center">
						<div class="px-8 text-muted-foreground">
							<div class="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-muted-foreground/30">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
								</svg>
							</div>
							<p class="text-sm font-medium opacity-50">Bridal photo · Teresa Guzmán Makeup</p>
							<p class="mt-1 text-xs opacity-30">Use magazine spread p.2 — min. 1500px wide</p>
						</div>
					</div>
					<!-- Actual image (uncomment and remove the placeholder above when photo is ready):
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
