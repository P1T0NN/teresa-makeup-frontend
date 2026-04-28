<script lang="ts">
	// CONFIG
	import { COMPANY_DATA } from '@/shared/constants.js';

	// CLASSES
	import { footerLinkClass } from './footer.svelte.ts';

	// COMPONENTS
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
				<Logo href="/" imgClass="brightness-0 invert" />
				<p class="max-w-xs text-sm leading-relaxed text-primary-foreground/70">
					{COMPANY_DATA.DESCRIPTION}
				</p>
			</div>

			<!-- Contact links -->
			<nav aria-label="Contact" class="flex flex-col gap-2">
				<p class="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-primary-foreground/50">
					Contact
				</p>
				<a
					href={COMPANY_DATA.EMAIL_HREF}
					class={cn(footerLinkClass, 'text-primary-foreground/80 hover:text-primary-foreground')}
				>
					{COMPANY_DATA.EMAIL}
				</a>
				<a
					href={COMPANY_DATA.PHONE_HREF}
					class={cn(footerLinkClass, 'text-primary-foreground/80 hover:text-primary-foreground')}
				>
					{COMPANY_DATA.PHONE_DISPLAY}
				</a>
				<a
					href={COMPANY_DATA.INSTAGRAM_URL}
					target="_blank"
					rel="noopener noreferrer"
					class={cn(footerLinkClass, 'text-primary-foreground/80 hover:text-primary-foreground')}
				>
					Instagram {COMPANY_DATA.INSTAGRAM}
				</a>
			</nav>
		</div>

		<div class="mt-10 border-t border-primary-foreground/10 pt-8 text-xs text-primary-foreground/40">
			<p>© 2026 Teresa Guzmán Makeup · Developed by <a href="https://omnilabs.us" target="_blank" rel="noopener noreferrer" class="hover:text-primary-foreground/70 transition-colors">OmniLabs</a></p>
		</div>
	</div>
</footer>
