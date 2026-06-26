<script lang="ts">
	import { COMPANY_DATA, UNPROTECTED_PAGE_ENDPOINTS } from '@/shared/constants.js';
	import Link from '@/shared/components/ui/link/link.svelte';
	import { cn } from '@/shared/utils/utils.js';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	type Props = {
		class?: string;
		/** Passed through to `<img>` (e.g. brightness on dark heroes). */
		imgClass?: string;
		href?: string;
		alt?: string;
		/** Visual size in the header / drawer. */
		size?: 'sm' | 'md';
		/** `both` = monogram + wordmark (default). */
		variant?: 'text' | 'image' | 'both';
	} & Omit<HTMLAnchorAttributes, 'href' | 'class' | 'children'>;

	let {
		class: className,
		imgClass,
		href = UNPROTECTED_PAGE_ENDPOINTS.ROOT,
		alt = `${COMPANY_DATA.NAME} logo`,
		size = 'md',
		variant = 'both',
		...restProps
	}: Props = $props();

	const imgSizeStyles = $derived(size === 'sm' ? 'h-7 w-auto' : 'h-9 w-auto');

	const textSizeStyles = $derived(
		size === 'sm'
			? 'max-w-[min(12rem,55vw)] text-sm font-semibold'
			: 'max-w-[min(13rem,60vw)] text-base font-semibold sm:text-lg'
	);

	const showImage = $derived(variant === 'image' || variant === 'both');
	const showText = $derived(variant === 'text' || variant === 'both');
</script>

<Link
	href={href}
	class={cn(
		'inline-flex min-w-0 shrink-0 items-center gap-2 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 rounded-sm',
		className
	)}
	{...restProps}
>
	{#if showImage}
		<img
			src={COMPANY_DATA.LOGO}
			{alt}
			class={cn('shrink-0 object-contain object-left', imgSizeStyles, imgClass)}
			width="36"
			height="36"
			loading="eager"
			decoding="async"
			draggable="false"
		/>
	{/if}
	{#if showText}
		<span class={cn('truncate font-serif italic leading-tight text-inherit', textSizeStyles)}>
			{COMPANY_DATA.NAME}
		</span>
	{/if}
</Link>
