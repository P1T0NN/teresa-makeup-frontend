<script lang="ts">
	import './layout.css';

	// COMPONENTS
	import { Toaster } from '@/shared/components/ui/sonner';
	import Header from '@/shared/components/ui/header/header.svelte';
	import Footer from '@/shared/components/ui/footer/footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href="/favicon.ico" sizes="48x48" type="image/x-icon" />
</svelte:head>
<div class="flex min-h-dvh flex-col">
	<Header changeBgOnScroll={true} />
	<div class="min-h-0 flex-1">
		{@render children()}
	</div>
	<Footer />
</div>
<Toaster richColors />