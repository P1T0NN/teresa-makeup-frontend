<script lang="ts">
	import './layout.css';
	import favicon from '@/shared/lib/assets/favicon.svg';

	// COMPONENTS
	import { Toaster } from '@/shared/components/ui/sonner';
	import Header from '@/shared/components/ui/header/header.svelte';
	import Footer from '@/shared/components/ui/footer/footer.svelte';

	let { children } = $props();
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