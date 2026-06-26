<script lang="ts">
	// LIBRARIES
	import { m } from '@/shared/lib/paraglide/messages';
	
	// COMPONENTS
	import SvelteHead from '@/shared/components/ui/svelte-head/svelte-head.svelte';
	import HeroSection from '@/shared/components/pages/(unprotected)/root/hero-section.svelte';
	import ServicesSection from '@/shared/components/pages/(unprotected)/root/services-section.svelte';
	import TestimonialsSection from '@/shared/components/pages/(unprotected)/root/testimonials-section/testimonials-section.svelte';
	import PortfolioSection from '@/shared/components/pages/(unprotected)/root/portfolio-section.svelte';
	import WhatsAppFab from '@/shared/components/pages/(unprotected)/root/whatsapp-fab.svelte';
	import AboutMeSection from '@/shared/components/pages/(unprotected)/root/about-me-section.svelte';
	import ContactSection from '@/shared/components/pages/(unprotected)/root/contact-section/contact-section.svelte';
</script>

<SvelteHead
	title={m['SEO.RootPage.title']()}
	description={m['SEO.RootPage.description']()}
	image="/root/hero-image-1280w.webp"
/>

<HeroSection />
<ContactSection />
<!--<BookingSection />-->
<ServicesSection />
<TestimonialsSection />
<PortfolioSection />
<AboutMeSection />

<!-- WhatsApp floating button — mobile only -->
<WhatsAppFab />
