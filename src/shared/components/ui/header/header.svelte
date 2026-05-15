<script lang="ts">
	// SVELTEKIT
	import { page } from '$app/state';

	// CONFIG
	import { COMPANY_DATA, UNPROTECTED_PAGE_ENDPOINTS } from '@/shared/constants.js';

	// LIBRARIES
	import { deLocalizeUrl } from '@/shared/lib/paraglide/runtime';
	import { m } from '@/shared/lib/paraglide/messages';

	// CLASSES
	import { navItems, navLinkActiveClass, navLinkClass } from './header.svelte.ts';

	// COMPONENTS
	import Button from '@/shared/components/ui/button/button.svelte';
	import Link from '@/shared/components/ui/link/link.svelte';
	import LanguageSelector from '@/shared/components/ui/language-selector/language-selector.svelte';
	import Logo from '@/shared/components/ui/logo/logo.svelte';
	import HeaderMobile from './header-mobile.svelte';

	// UTILS
	import { isNavItemActive } from '@/shared/utils/isNavItemActive.js';
	import { cn } from '@/shared/utils/utils.js';

	type Props = {
		class?: string;
		isSticky?: boolean;
		isTransparent?: boolean;
		changeBgOnScroll?: boolean;
		hasLogo?: boolean;
	};

	let {
		class: className,
		isSticky = true,
		isTransparent = false,
		changeBgOnScroll = false,
		hasLogo = true
	}: Props = $props();

	const pathnameLogical = $derived(new URL(deLocalizeUrl(page.url.href)).pathname);

	let scrolledPastTop = $state(false);

	$effect(() => {
		if (!isTransparent || !changeBgOnScroll) {
			scrolledPastTop = false;
			return;
		}

		const onScroll = () => {
			scrolledPastTop = window.scrollY > 8;
		};

		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});

	const useSolidBar = $derived(!isTransparent || (changeBgOnScroll && scrolledPastTop));
</script>

<header
	class={cn(
		'z-50 w-full max-w-full overflow-x-clip transition-[background-color,backdrop-filter,border-color,box-shadow] duration-300 ease-out',
		isSticky ? 'sticky top-0' : 'relative',
		useSolidBar
			? 'border-b border-border bg-background/95 shadow-none backdrop-blur supports-backdrop-filter:bg-background/80'
			: 'border-b border-transparent bg-transparent shadow-none backdrop-blur-none',
		className
	)}
>
	<div class="mx-auto flex h-16 w-full max-w-7xl items-center gap-2 px-4 sm:gap-3 sm:px-6 lg:px-8">
		<div class="flex min-w-0 shrink items-center gap-2 lg:shrink-0">
			{#if hasLogo}
				<Logo href={UNPROTECTED_PAGE_ENDPOINTS.ROOT} />
			{:else}
				<Link
					href={UNPROTECTED_PAGE_ENDPOINTS.ROOT}
					class="truncate text-sm font-semibold tracking-tight text-foreground sm:text-base"
				>
					{COMPANY_DATA.NAME}
				</Link>
			{/if}
		</div>

		<nav
			class="hidden min-w-0 flex-1 justify-center lg:flex"
			aria-label={m['Header.mainNavigation']()}
		>
			<ul class="flex max-w-full min-w-0 flex-wrap items-center justify-center gap-1">
				{#each navItems as item (item.href)}
					{@const active = isNavItemActive(pathnameLogical, item.href)}
					<li class="shrink-0">
						<Link
							href={item.href}
							class={cn(navLinkClass, active && navLinkActiveClass)}
							aria-current={active ? 'page' : undefined}
						>
							{item.label}
						</Link>
					</li>
				{/each}
			</ul>
		</nav>

		<div class="ml-auto flex shrink-0 items-center justify-end gap-2 lg:ml-0">
			<LanguageSelector />
			<Button
				href={UNPROTECTED_PAGE_ENDPOINTS.CONTACT}
				variant="default"
				size="lg"
				class="hidden bg-primary text-primary-foreground hover:bg-primary/90 lg:inline-flex"
			>
				{m['Header.bookAppointment']()}
			</Button>

			<HeaderMobile {hasLogo} />
		</div>
	</div>
</header>
