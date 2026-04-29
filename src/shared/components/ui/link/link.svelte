<script lang="ts">
	// UTILS
	import { localizeHrefForUi } from '@/shared/utils/localizedPath';
	import { cn, type WithElementRef } from '@/shared/utils/utils.js';

	// TYPES
	import type { LocalizeHrefUiLocale } from '@/shared/utils/localizedPath';
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	export type LinkProps = WithElementRef<
		Omit<HTMLAnchorAttributes, 'href'> & {
			href: string;
			/** Override target locale; defaults to current locale from the URL. */
			locale?: LocalizeHrefUiLocale;
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

	const localizedHref = $derived(localizeHrefForUi(href, locale !== undefined ? { locale } : undefined));
</script>

<a bind:this={ref} data-slot="link" href={localizedHref} class={cn(className)} {...restProps}>
	{@render children()}
</a>
