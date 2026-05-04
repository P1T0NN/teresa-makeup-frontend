<script lang="ts">
	// SVELTEKIT
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/state';

	// CONFIG
	import { COMPANY_DATA, UNPROTECTED_PAGE_ENDPOINTS } from '@/shared/constants.js';

	// LIBRARIES
	import { deLocalizeUrl } from '@/shared/lib/paraglide/runtime';
	import { m } from '@/shared/lib/paraglide/messages';

	// CLASSES
	import {
		normalHeader,
		navItems,
		navLinkActiveClass,
		navLinkClass
	} from './header.svelte.ts';

	// COMPONENTS
	import { buttonVariants } from '@/shared/components/ui/button/button.svelte';
	import Button from '@/shared/components/ui/button/button.svelte';
	import Link from '@/shared/components/ui/link/link.svelte';
	import Logo from '@/shared/components/ui/logo/logo.svelte';
	import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from '@/shared/components/ui/drawer';

	// UTILS
	import { cn } from '@/shared/utils/utils.js';
	import { isNavItemActive } from '@/shared/utils/isNavItemActive.js';

	// TYPES
	import type { ClassValue } from 'clsx';

	// LUCIDE ICONS
	import MenuIcon from '@lucide/svelte/icons/menu';
	import XIcon from '@lucide/svelte/icons/x';

	let { hasLogo = true }: { hasLogo?: boolean } = $props();

	const pathnameLogical = $derived(new URL(deLocalizeUrl(page.url.href)).pathname);

	afterNavigate(() => {
		normalHeader.closeMenu();
	});
</script>

<Drawer
	bind:open={normalHeader.menuOpen}
	direction="right"
	shouldScaleBackground={false}
	onOpenChange={(open) => {
		if (open) {
			requestAnimationFrame(() => {
				document.getElementById('site-mobile-nav-first')?.focus();
			});
		}
	}}
>
	<DrawerTrigger>
		{#snippet child({ props })}
			<button
				{...props}
				type="button"
				class={cn(
					buttonVariants({ variant: 'ghost', size: 'icon' }),
					'lg:hidden touch-manipulation',
					props.class as ClassValue
				)}
				aria-controls="site-mobile-nav"
				aria-label={normalHeader.menuOpen ? m['Header.closeMenu']() : m['Header.openMenu']()}
			>
				{#if normalHeader.menuOpen}
					<XIcon class="size-5" />
				{:else}
					<MenuIcon class="size-5" />
				{/if}
			</button>
		{/snippet}
	</DrawerTrigger>

	<DrawerContent
		id="site-mobile-nav"
		aria-describedby={undefined}
		class="flex h-full max-h-dvh w-full max-w-80 flex-col gap-4 overflow-y-auto overflow-x-hidden border-border bg-background p-4 shadow-lg! data-[vaul-drawer-direction=right]:w-full sm:max-w-80"
	>
		<div class="flex min-w-0 items-center justify-between gap-2">
			<div class="min-w-0">
				{#if hasLogo}
					<Logo size="sm" href={UNPROTECTED_PAGE_ENDPOINTS.ROOT} onclick={normalHeader.closeMenu} />
				{:else}
					<span class="truncate text-sm font-semibold">{COMPANY_DATA.NAME}</span>
				{/if}
			</div>

			<DrawerClose>
				<Button
					type="button"
					variant="ghost"
					size="icon"
					class="shrink-0 touch-manipulation"
					aria-label={m['Header.closeMenu']()}
				>
					<XIcon class="size-5" />
				</Button>
			</DrawerClose>
		</div>

		<nav aria-label={m['Header.mobileMainMenu']()}>
			<ul class="flex flex-col gap-1">
				{#each navItems as item, i (item.href)}
					{@const active = isNavItemActive(pathnameLogical, item.href)}
					<li>
						<Link
							id={i === 0 ? 'site-mobile-nav-first' : undefined}
							href={item.href}
							class={cn(navLinkClass, 'block w-full', active && navLinkActiveClass)}
							aria-current={active ? 'page' : undefined}
							onclick={normalHeader.closeMenu}
						>
							{item.label}
						</Link>
					</li>
				{/each}
			</ul>
		</nav>

		<div class="mt-auto flex flex-col gap-3">
			<Button
				href={UNPROTECTED_PAGE_ENDPOINTS.BOOKING}
				variant="default"
				class="w-full bg-primary text-primary-foreground hover:bg-primary/90"
				onclick={normalHeader.closeMenu}
			>
				{m['Header.bookAppointment']()}
			</Button>
		</div>
	</DrawerContent>
</Drawer>
