<script lang="ts">
	// LIBRARIES
	import { m } from '@/shared/lib/paraglide/messages';

	// CONFIG
	import { COMPANY_DATA, UNPROTECTED_PAGE_ENDPOINTS } from '@/shared/constants.js';

	// CLASSES
	import { footerLinkClass } from './footer.svelte.ts';

	// COMPONENTS
	import CreatedByOmnilabs from '@/shared/components/ui/created-by-omnilabs/created-by-omnilabs.svelte';
	import Instagram from '@/shared/components/ui/instagram/instagram.svelte';
	import Logo from '@/shared/components/ui/logo/logo.svelte';

	// UTILS
	import { cn } from '@/shared/utils/utils.js';

	type Props = {
		class?: string;
	};

	let { class: className }: Props = $props();
</script>

<footer
	id="contact"
	class={cn(
		'w-full max-w-full overflow-x-clip border-t border-border bg-foreground text-primary-foreground',
		className
	)}
>
	<div class="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
		<div class="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
			<!-- Brand -->
			<div class="flex flex-col gap-3">
				<Logo href={UNPROTECTED_PAGE_ENDPOINTS.ROOT} />
				<p class="max-w-xs text-sm leading-relaxed text-primary-foreground/70">
					{COMPANY_DATA.DESCRIPTION}
				</p>

				<Instagram class="-ml-0.5" />
			</div>

			<!-- Contact links -->
			<nav aria-label={m['Footer.contact']()} class="flex flex-col gap-2">
				<p class="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-primary-foreground/50">
					{m['Footer.contact']()}
				</p>
				
				<a
					href={COMPANY_DATA.EMAIL_HREF}
					rel="external"
					class={cn(footerLinkClass, 'text-primary-foreground/80 hover:text-primary-foreground')}
				>
					{COMPANY_DATA.EMAIL}
				</a>

				<a
					href={COMPANY_DATA.PHONE_HREF}
					rel="external"
					class={cn(footerLinkClass, 'text-primary-foreground/80 hover:text-primary-foreground')}
				>
					{COMPANY_DATA.PHONE_DISPLAY}
				</a>
			</nav>
		</div>

		<div
			class="mt-10 flex flex-col gap-8 border-t border-primary-foreground/10 pt-8 sm:flex-row sm:items-end sm:justify-between"
		>
			<p class="text-xs text-primary-foreground/40">© {new Date().getFullYear()} {COMPANY_DATA.NAME}</p>
			<CreatedByOmnilabs class="mx-auto shrink-0 sm:mx-0 sm:ml-auto" />
		</div>
	</div>
</footer>
