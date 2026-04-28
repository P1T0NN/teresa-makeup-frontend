<script lang="ts">
	// TYPES
	import type { typesTestimonial } from '@/shared/types/types';

	// LUCIDE ICONS
	import StarIcon from '@lucide/svelte/icons/star';

	let { testimonial, variant = 'default' }: {
		testimonial: typesTestimonial;
		variant?: 'featured' | 'default';
	} = $props();
</script>

{#if variant === 'featured'}
	<div class="relative mx-auto max-w-2xl px-6 text-center sm:px-16">
		<span
			class="pointer-events-none absolute -top-10 left-0 select-none font-serif text-[10rem] leading-none text-primary/6 sm:left-4"
			aria-hidden="true"
		>"</span>

		<p class="relative font-serif text-2xl font-medium italic leading-relaxed text-primary sm:text-3xl">
			{testimonial.text}
		</p>

		<div class="mt-8 flex flex-col items-center gap-2">
			<div class="flex gap-1 text-secondary" aria-label="{testimonial.stars} out of 5 stars">
				{#each [...Array(testimonial.stars).keys()] as index (index)}
					<StarIcon class="size-3.5 shrink-0 fill-current" aria-hidden="true" />
				{/each}
			</div>
			<p class="font-serif text-sm italic text-secondary">— {testimonial.name}</p>
		</div>
	</div>
{:else}
	<div class="border-l-2 border-secondary/30 pl-6">
		<p class="font-serif text-lg font-medium italic leading-relaxed text-foreground/80">
			"{testimonial.text}"
		</p>
		<div class="mt-4 flex items-center gap-3">
			<div class="flex gap-0.5 text-secondary" aria-label="{testimonial.stars} out of 5 stars">
				{#each [...Array(testimonial.stars).keys()] as index (index)}
					<StarIcon class="size-3 shrink-0 fill-current" aria-hidden="true" />
				{/each}
			</div>
			<p class="text-xs font-semibold uppercase tracking-[0.15em] text-secondary">
				{testimonial.name}
			</p>
		</div>
	</div>
{/if}
