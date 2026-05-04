// LIBRARIES
import { m } from '@/shared/lib/paraglide/messages';

// TYPES
import type { typesServiceOptionId } from '@/features/services/types/servicesTypes';

/** One row on the landing “Services” section — matches {@link serviceOptions} order and ids. */
export type typesHomepageServiceSectionRow = {
	id: typesServiceOptionId;
	ordinal: string;
	title: string;
	description: string;
};

/** Radio / booking picker options. Order matches homepage list. */
export const serviceOptions: { id: typesServiceOptionId; label: string }[] = [
	{ id: 'bridal-trial', label: m['ServicesData.bridalTrial.label']() },
	{ id: 'social-makeup', label: m['ServicesData.socialMakeup.label']() },
	{ id: 'facial-cleansing', label: m['ServicesData.facialCleansing.label']() },
	{ id: 'maderotherapy', label: m['ServicesData.maderotherapy.label']() },
	{ id: 'lymphatic-drainage', label: m['ServicesData.lymphaticDrainage.label']() }
];

/** Same order as {@link serviceOptions}; reuse for validators (e.g. Valibot picklist). */
export const serviceOptionIds = serviceOptions.map((o) => o.id);

/** Appointment length for Google Calendar and slot availability (minutes). */
export const SERVICE_BOOKING_DURATION_MINUTES: Record<typesServiceOptionId, number> = {
	'bridal-trial': 120,
	'social-makeup': 60,
	'facial-cleansing': 120,
	'maderotherapy': 60,
	'lymphatic-drainage': 60
} as const;

/**
 * Marketing copy for `#services` — rows aligned 1:1 with {@link serviceOptions}.
 */
export const homepageServicesSection: readonly typesHomepageServiceSectionRow[] = [
	{
		id: 'bridal-trial',
		ordinal: '01',
		title: m['ServicesData.bridalTrial.title'](),
		description: m['ServicesData.bridalTrial.description']()
	},
	{
		id: 'social-makeup',
		ordinal: '02',
		title: m['ServicesData.socialMakeup.title'](),
		description: m['ServicesData.socialMakeup.description']()
	},
	{
		id: 'facial-cleansing',
		ordinal: '03',
		title: m['ServicesData.facialCleansing.title'](),
		description: m['ServicesData.facialCleansing.description']()
	},
	{
		id: 'maderotherapy',
		ordinal: '04',
		title: m['ServicesData.maderotherapy.title'](),
		description: m['ServicesData.maderotherapy.description']()
	},
	{
		id: 'lymphatic-drainage',
		ordinal: '05',
		title: m['ServicesData.lymphaticDrainage.title'](),
		description: m['ServicesData.lymphaticDrainage.description']()
	}
];
