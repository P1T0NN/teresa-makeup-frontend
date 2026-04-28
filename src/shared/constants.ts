export const COMPANY_DATA = {
	NAME: 'Teresa Guzmán Makeup',
	LOGO: '/logo/logo.webp',
	DESCRIPTION:
		'Professional makeup artist specializing in bridal and social makeup in Valencia.',
	// TODO: confirm real email with Teresa
	EMAIL: 'hola@teresamakeup.es',
	EMAIL_HREF: 'mailto:hola@teresamakeup.es',
	// TODO: confirm real phone number with Teresa
	PHONE_DISPLAY: '+34 XXX XXX XXX',
	PHONE_HREF: 'tel:+34XXXXXXXXX',
	INSTAGRAM: '@teresamakeup',
	INSTAGRAM_URL: 'https://instagram.com/teresamakeup',
	// TODO: confirm WhatsApp number with Teresa (used for wa.me booking link)
	WHATSAPP_NUMBER: '34XXXXXXXXX',
} as const;

export const PROTECTED_PAGE_ENDPOINTS = {
	HOME: '/',
} as const;

export const UNPROTECTED_PAGE_ENDPOINTS = {
	ROOT: '/',
} as const;

/**
 * IANA timezone of the salon. Google Calendar events are reinterpreted in this
 * zone when computing busy intervals — so an event the owner creates at "4pm"
 * always blocks 4pm at the salon, regardless of the owner's device timezone.
 */
export const SALON_TIMEZONE = 'Europe/Madrid';
