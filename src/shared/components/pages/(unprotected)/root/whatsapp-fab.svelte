<script lang="ts">
	// CONFIG
	import { COMPANY_DATA } from '@/shared/constants.js';

	// LUCIDE ICONS
	import MessageCircleIcon from '@lucide/svelte/icons/message-circle';

	// TODO: Set to Teresa's real WhatsApp number in COMPANY_DATA.WHATSAPP_NUMBER (constants.ts).
	// Final href: `https://wa.me/${COMPANY_DATA.WHATSAPP_NUMBER}`
	// TODO: Track click as GA4 conversion event (brief §6):
	// window.gtag?.('event', 'whatsapp_fab_click', { source: 'floating_button' });
	const whatsappHref = `https://wa.me/${COMPANY_DATA.WHATSAPP_NUMBER}`;

	function handleClick() {
		// TODO: Track GA4 WhatsApp conversion event here (brief §6).
		// window.gtag?.('event', 'whatsapp_fab_click', { source: 'floating_button' });
	}
</script>

<!-- Sticky WhatsApp button — mobile only (lg:hidden) -->
<a
	href={whatsappHref}
	target="_blank"
	rel="noopener noreferrer"
	onclick={handleClick}
	class="lg:hidden fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 shadow-lg transition-transform hover:scale-105 active:scale-95"
	aria-label="Message on WhatsApp"
>
	<MessageCircleIcon class="h-5 w-5 shrink-0 text-white" strokeWidth={2} aria-hidden="true" />
	<span class="text-sm font-semibold text-white">Message now</span>
</a>
