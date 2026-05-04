// LIBRARIES
import { m } from "./lib/paraglide/messages";

export const COMPANY_DATA = {
	NAME: 'Teresa Guzmán Makeup',
	LOGO: '/logo/logo.webp',
	DESCRIPTION: m['CompanyData.description'](),
	EMAIL: 'hola@teresamakeup.es',
	EMAIL_HREF: 'mailto:hola@teresamakeup.es',
	PHONE_DISPLAY: '+34 XXX XXX XXX',
	PHONE_HREF: 'tel:+34XXXXXXXXX',
	INSTAGRAM: '@teresamakeup.es',
	INSTAGRAM_URL: 'https://www.instagram.com/teresamakeup.es/',
	WHATSAPP_NUMBER: '+34692116800',
	RESERVATION_TITLE: m['CompanyData.reservationTitle'](),
	DOMAIN: 'teresamakeup.es',

	/**
	 * IANA timezone of the salon. Google Calendar events are reinterpreted in this
	 * zone when computing busy intervals — so an event the owner creates at "4pm"
	 * always blocks 4pm at the salon, regardless of the owner's device timezone.
	 */
	SALON_TIMEZONE: 'Europe/Madrid'
} as const;

/**
 * Paths for the landing page (anchors on `/`). Use these for `<Button href>` / `<a href>`
 * instead of hardcoding `/#section`.
 */
export const UNPROTECTED_PAGE_ENDPOINTS = {
	ROOT: '/',
	BOOKING: '/#booking',
	SERVICES: '/#services',
	ABOUT_ME: '/#about',
	/** Testimonials strip (`id="gallery"`). */
	TESTIMONIALS: '/#gallery',
	PORTFOLIO: '/#portfolio',
	CONTACT: '/#contact',
	RESERVATION_CONFIRMATION: '/reservation-confirmation'
} as const;
