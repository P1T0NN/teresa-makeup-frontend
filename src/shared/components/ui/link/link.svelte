<script lang="ts">
	// SVELTEKIT IMPORTS
	import { resolve } from '$app/paths';

	// LIBRARIES
	import { localizeHref } from '@/shared/lib/paraglide/runtime';

	// UTILS
	import { shouldSkipLocalePrefix } from '@/shared/utils/paraglideHref';
	import { cn, type WithElementRef } from '@/shared/utils/utils.js';

	// TYPES
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	export type LinkProps = WithElementRef<
		Omit<HTMLAnchorAttributes, 'href'> & {
			href: string;
			/** Override target locale; defaults to current locale from the URL. */
			locale?: 'en' | 'de' | 'es';
			children: Snippet;
		}
	>;

	let {
		class: className,
		href,
		locale,
		ref = $bindable(null),
		children,
		...restProps
	}: LinkProps = $props();

	const localizedHref = $derived(
		shouldSkipLocalePrefix(href)
			? href
			: localizeHref(href, locale !== undefined ? { locale } : undefined)
	);
</script>

<a bind:this={ref} data-slot="link" href={resolve(localizedHref as '/')} class={cn(className)} {...restProps}>
	{@render children()}
</a>
