<script lang="ts">
	// SVELTEKIT IMPORTS
	import { page } from '$app/state';

	// CONFIG
	import { COMPANY_DATA } from '@/shared/constants.js';

	// UTILS
	import { deLocalizeUrl } from '@/shared/lib/paraglide/runtime';

	let {
		title,
		description,
		image,
		type = 'website',
		noindex = false,
		canonical
	}: {
		title?: string;
		description?: string;
		/** Static path (`/root/hero.webp`) or absolute URL */
		image?: string;
		type?: 'website' | 'article';
		noindex?: boolean;
		canonical?: string;
	} = $props();

	const pathname = $derived(deLocalizeUrl(page.url).pathname);
	const canonicalUrl = $derived(canonical ?? `${page.url.origin}${pathname}`);
	const imageUrl = $derived.by(() => {
		if (!image) return undefined;
		if (/^https?:\/\//.test(image)) return image;
		return `${page.url.origin}${image.startsWith('/') ? image : `/${image}`}`;
	});

	const titleFromPath = $derived.by(() => {
		const segments = pathname.split('/').filter(Boolean);
		if (segments.length === 0) return 'Home';
		return segments[segments.length - 1]
			.replace(/[-_]+/g, ' ')
			.replace(/\b\w/g, (c) => c.toUpperCase());
	});

	const resolvedTitle = $derived(title ?? titleFromPath);
	const fullTitle = $derived(`${resolvedTitle} | ${COMPANY_DATA.NAME}`);
	const resolvedDescription = $derived(
		description ?? `${resolvedTitle} page on ${COMPANY_DATA.NAME}. ${COMPANY_DATA.DESCRIPTION}`
	);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={resolvedDescription} />
	<link rel="canonical" href={canonicalUrl} />

	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={resolvedDescription} />
	<meta property="og:type" content={type} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:site_name" content={COMPANY_DATA.NAME} />

	<meta name="twitter:card" content={imageUrl ? 'summary_large_image' : 'summary'} />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={resolvedDescription} />

	{#if imageUrl}
		<meta property="og:image" content={imageUrl} />
		<meta name="twitter:image" content={imageUrl} />
	{/if}

	{#if noindex}
		<meta name="robots" content="noindex" />
	{/if}
</svelte:head>
