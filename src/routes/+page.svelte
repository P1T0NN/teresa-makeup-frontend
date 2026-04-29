<script lang="ts">
	// LIBRARIES
	import { m } from '@/shared/lib/paraglide/messages';
	
	// COMPONENTS
	import HeroSection from '@/shared/components/pages/(unprotected)/root/hero-section.svelte';
	import ServicesSection from '@/shared/components/pages/(unprotected)/root/services-section.svelte';
	import BookingSection from '@/shared/components/pages/(unprotected)/root/booking-section/booking-section.svelte';
	import TestimonialsSection from '@/shared/components/pages/(unprotected)/root/testimonials-section/testimonials-section.svelte';
	import PortfolioSection from '@/shared/components/pages/(unprotected)/root/portfolio-section.svelte';
	import WhatsAppFab from '@/shared/components/pages/(unprotected)/root/whatsapp-fab.svelte';
	import AboutMeSection from '@/shared/components/pages/(unprotected)/root/about-me-section.svelte';
	import ContactSection from '@/shared/components/pages/(unprotected)/root/contact-section/contact-section.svelte';
</script>

<svelte:head>
	<title>{m['SEO.RootPage.title']()}</title>
	<meta
		name="description"
		content={m['SEO.RootPage.description']()}
	/>
</svelte:head>

<HeroSection />
<BookingSection />
<ServicesSection />
<TestimonialsSection />
<PortfolioSection />
<AboutMeSection />
<ContactSection />

<!-- WhatsApp floating button — mobile only -->
<WhatsAppFab />
