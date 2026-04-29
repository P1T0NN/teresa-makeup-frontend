<script lang="ts">
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
	<title>Professional Makeup Artist in Valencia · Bridal Specialist – Teresa Guzmán Makeup</title>
	<meta
		name="description"
		content="Bridal, social, and special-effects makeup in Valencia. Teresa Guzmán: long-wear skin prep, on-location service, and a personalized trial. Book your appointment."
	/>
</svelte:head>

<HeroSection />
<ServicesSection />
<BookingSection />
<TestimonialsSection />
<PortfolioSection />
<AboutMeSection />
<ContactSection />

<!-- WhatsApp floating button — mobile only -->
<WhatsAppFab />
