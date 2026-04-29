<script lang="ts">
	// LIBRARIES
	import { m } from '@/shared/lib/paraglide/messages';
	import { localizeHref } from '@/shared/lib/paraglide/runtime';
	
	// CONFIG
	import { COMPANY_DATA, UNPROTECTED_PAGE_ENDPOINTS } from '@/shared/constants';

	// COMPONENTS
	import Button from '@/shared/components/ui/button/button.svelte';
	import Instagram from '@/shared/components/ui/instagram/instagram.svelte';

	// LUCIDE ICONS
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
	import CheckIcon from '@lucide/svelte/icons/check';
	import SparkleIcon from '@lucide/svelte/icons/sparkle';
	import MessageCircleIcon from '@lucide/svelte/icons/message-circle';
</script>

<svelte:head>
	<title>{m['SEO.ReservationConfirmationPage.title']()}</title>
	<meta
		name="description"
		content={m['SEO.ReservationConfirmationPage.description']()}
	/>
	<meta name="robots" content="noindex" />
</svelte:head>

<div
	class="relative flex min-h-[calc(100dvh-4rem)] w-full flex-col items-center justify-center overflow-hidden bg-primary px-4 py-16 sm:py-20"
>
	<!-- Decorative watermark -->
	<SparkleIcon
		aria-hidden="true"
		class="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary-foreground/2.5"
		size={512}
		strokeWidth={1}
	/>

	<!-- Animated check ring -->
	<div
		class="animate-in fade-in-0 zoom-in-75 relative mb-10 flex h-24 w-24 items-center justify-center duration-500 fill-mode-[both]"
		style="animation-delay: 0ms;"
	>
		<div class="ring-pulse absolute inset-0 rounded-full border border-primary-foreground/25"></div>
		<div class="ring-enter absolute inset-3 rounded-full border border-primary-foreground/15"></div>
		<CheckIcon
			class="confirmation-draw-check relative shrink-0 text-primary-foreground"
			size={36}
			strokeWidth={2.25}
			aria-hidden="true"
		/>
	</div>

	<!-- Eyebrow badge -->
	<p
		class="animate-in fade-in-0 slide-in-from-bottom-3 mb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.25em] text-primary-foreground/50 duration-500 fill-mode-[both]"
		style="animation-delay: 150ms;"
	>
		{m['ReservationConfirmationPage.reservationConfirmed']()}
	</p>

	<!-- Main headline -->
	<h1
		class="animate-in fade-in-0 slide-in-from-bottom-4 max-w-xs text-center font-serif text-4xl font-medium italic text-primary-foreground duration-700 fill-mode-[both] sm:max-w-sm sm:text-5xl"
		style="animation-delay: 270ms;"
	>
		{m['ReservationConfirmationPage.youAreAllSet']()}
	</h1>

	<!-- Sub-copy -->
	<p
		class="animate-in fade-in-0 slide-in-from-bottom-3 mt-4 max-w-xs text-center text-sm leading-relaxed text-primary-foreground/55 duration-500 fill-mode-[both]"
		style="animation-delay: 400ms;"
	>
		{m['ReservationConfirmationPage.teresaWillBeInTouch']()}
	</p>

	<!-- Action buttons -->
	<div
		class="animate-in fade-in-0 slide-in-from-bottom-3 mt-10 flex flex-col items-center gap-3 duration-500 fill-mode-[both] sm:flex-row"
		style="animation-delay: 550ms;"
	>
		<Button
			href={localizeHref(UNPROTECTED_PAGE_ENDPOINTS.ROOT)}
			variant="ghost"
			class="border border-primary-foreground/20 text-primary-foreground/75 hover:border-primary-foreground/35 hover:bg-primary-foreground/10 hover:text-primary-foreground"
		>
			<ArrowLeftIcon class="mr-1.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
			{m['ReservationConfirmationPage.backToSite']()}
		</Button>

		<a
			href="https://wa.me/{COMPANY_DATA.WHATSAPP_NUMBER}"
			target="_blank"
			rel="noopener noreferrer"
			class="inline-flex h-10 items-center gap-2 rounded-md bg-primary-foreground/10 px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/20"
		>
			<MessageCircleIcon class="h-4 w-4 shrink-0" aria-hidden="true" />
			{m['ReservationConfirmationPage.messageTeresa']()}
		</a>
	</div>

	<!-- Divider + Instagram nudge -->
	<div
		class="animate-in fade-in-0 mt-14 flex flex-col items-center gap-4 duration-700 fill-mode-[both]"
		style="animation-delay: 750ms;"
	>
		<div class="flex w-full max-w-56 items-center gap-3">
			<div class="h-px flex-1 bg-primary-foreground/10"></div>
			<span class="font-serif text-xs italic text-primary-foreground/25">{m['ReservationConfirmationPage.whileYouWait']()}</span>
			<div class="h-px flex-1 bg-primary-foreground/10"></div>
		</div>

		<Instagram
			class="text-xs text-primary-foreground/35 transition-colors hover:text-primary-foreground/65"
			label={m['ReservationConfirmationPage.followTeresaForBridalInspiration']()}
		/>
	</div>
</div>

<style>
	/* Check drawing animation */
	@keyframes draw-check {
		to {
			stroke-dashoffset: 0;
		}
	}
	/* Lucide puts `class` on the root `<svg>`; animate the check path */
	:global(svg.confirmation-draw-check path) {
		vector-effect: non-scaling-stroke;
		stroke-dasharray: 28;
		stroke-dashoffset: 28;
		animation: draw-check 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.4s forwards;
	}

	/* Outer ring pops in then pulses softly */
	@keyframes ring-enter {
		from {
			transform: scale(0.7);
			opacity: 0;
		}
		to {
			transform: scale(1);
			opacity: 1;
		}
	}
	@keyframes ring-pulse {
		0%,
		100% {
			transform: scale(1);
			opacity: 0.25;
		}
		50% {
			transform: scale(1.1);
			opacity: 0.5;
		}
	}
	.ring-enter {
		opacity: 0;
		animation: ring-enter 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s forwards;
	}
	.ring-pulse {
		opacity: 0;
		animation:
			ring-enter 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s forwards,
			ring-pulse 3.2s ease-in-out 0.55s infinite;
	}
</style>
