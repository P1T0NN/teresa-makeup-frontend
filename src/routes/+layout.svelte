<script lang="ts">
	import './layout.css';
	import favicon from '@/shared/lib/assets/favicon.svg';

	// SVELTEKIT IMPORTS
	import { beforeNavigate } from '$app/navigation';
	import { updated } from '$app/state';
	import { onMount } from 'svelte';

	// COMPONENTS
	import { Toaster } from '@/shared/components/ui/sonner';
	import Header from '@/shared/components/ui/header/header.svelte';
	import Footer from '@/shared/components/ui/footer/footer.svelte';

	let { children } = $props();

	// If a navigation happens after a new version is deployed, force a full reload
	beforeNavigate(({ willUnload, to }) => {
		if (updated.current && !willUnload && to?.url) {
			location.href = to.url.href;
		}
	});

	// Catch any chunk that fails to load and recover by reloading
	onMount(() => {
		window.addEventListener('vite:preloadError', (event) => {
			event.preventDefault();
			window.location.reload();
		});
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<div class="flex min-h-dvh flex-col">
	<Header changeBgOnScroll={true} />
	<div class="min-h-0 flex-1">
		{@render children()}
	</div>
	<Footer />
</div>
<Toaster richColors />