<script lang="ts">
	import { COMPANY_DATA, UNPROTECTED_PAGE_ENDPOINTS } from '@/shared/constants.js';
	import Link from '@/shared/components/ui/link/link.svelte';
	import { cn } from '@/shared/utils/utils.js';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	type Props = {
		class?: string;
		/** Passed through to `<img>` (e.g. brightness on dark heroes). Ignored when `isText`. */
		imgClass?: string;
		href?: string;
		alt?: string;
		/** Visual size in the header / drawer. */
		size?: 'sm' | 'md';
		/** Show brand wordmark text instead of the image logo. Defaults to `true` for this project. */
		isText?: boolean;
	} & Omit<HTMLAnchorAttributes, 'href' | 'class' | 'children'>;

	let {
		class: className,
		imgClass,
		href = UNPROTECTED_PAGE_ENDPOINTS.ROOT,
		alt = `${COMPANY_DATA.NAME} logo`,
		size = 'md',
		isText = true,
		...restProps
	}: Props = $props();

	const sizeStyles = $derived(
		size === 'sm'
			? 'h-7 max-h-7 w-auto max-w-[min(9rem,40vw)]'
			: 'h-8 max-h-9 w-auto max-w-[min(10rem,45vw)]'
	);

	const textSizeStyles = $derived(
		size === 'sm' ? 'max-w-[min(12rem,55vw)] text-sm font-semibold' : 'max-w-[min(13rem,60vw)] text-base font-semibold sm:text-lg'
	);
</script>

<Link
	href={href}
	class={cn(
		'inline-flex min-w-0 shrink-0 items-center outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 rounded-sm',
		className
	)}
	{...restProps}
>
	{#if isText}
		<span class={cn('truncate font-serif italic leading-tight text-inherit', textSizeStyles)}>
			{COMPANY_DATA.NAME}
		</span>
	{:else}
		<img
			src={COMPANY_DATA.LOGO}
			{alt}
			class={cn('object-contain object-left', sizeStyles, imgClass)}
			width="160"
			height="36"
			loading="eager"
			decoding="async"
			draggable="false"
		/>
	{/if}
</Link>
