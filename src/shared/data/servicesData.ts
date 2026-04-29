// TYPES
import type { typesServiceOptionId } from '@/features/services/types/servicesTypes';

/** One row on the landing “Services” section — matches {@link serviceOptions} order and ids. */
export type typesHomepageServiceSectionRow = {
	id: typesServiceOptionId;
	ordinal: string;
	title: string;
	description: string;
};

/** Radio / booking picker options (Spanish labels). Order matches homepage list. */
export const serviceOptions: { id: typesServiceOptionId; label: string }[] = [
	{ id: 'bridal-trial', label: 'Prueba de novia' },
	{ id: 'social-makeup', label: 'Maquillaje social' },
	{ id: 'facial-cleansing', label: 'Limpieza facial' },
	{ id: 'maderotherapy', label: 'Maderoterapia' },
	{ id: 'dermapen', label: 'Dermapen' },
	{ id: 'lymphatic-drainage', label: 'Drenaje linfático' }
];

/** Same order as {@link serviceOptions}; reuse for validators (e.g. Valibot picklist). */
export const serviceOptionIds = serviceOptions.map((o) => o.id);

/**
 * Marketing copy for `#services` — six rows aligned 1:1 with {@link serviceOptions}.
 */
export const homepageServicesSection: readonly typesHomepageServiceSectionRow[] = [
	{
		id: 'bridal-trial',
		ordinal: '01',
		title: 'Bridal trial',
		description:
			'A personalised preview of your wedding-day makeup with skin prep designed to wear from first look until the last dance — includes colour direction, timings, and a clear plan toward the ceremony.'
	},
	{
		id: 'social-makeup',
		ordinal: '02',
		title: 'Social makeup',
		description:
			'Radiant glam for dinners, celebrations, graduations, and guest weddings — camera-ready refinement that still feels unmistakably you.'
	},
	{
		id: 'facial-cleansing',
		ordinal: '03',
		title: 'Facial cleansing',
		description:
			'Deep cleansing to revive dull or congested skin — restores clarity and softness so complexion-based makeup sits evenly and wears longer.'
	},
	{
		id: 'maderotherapy',
		ordinal: '04',
		title: 'Maderotherapy',
		description:
			'Wooden sculpting strokes to soften tension and support firmer contours on face or body — a soothing prelude to complexion work or bridal prep.'
	},
	{
		id: 'dermapen',
		ordinal: '05',
		title: 'Dermapen',
		description:
			'Controlled microneedling to brighten tone, soften texture, and encourage collagen turnover — calibrated for smoother, luminous skin between events.'
	},
	{
		id: 'lymphatic-drainage',
		ordinal: '06',
		title: 'Lymphatic drainage',
		description:
			'Gentle drainage massage to minimise puffiness, refresh sluggish areas, and leave the face rested — ideal ahead of shoots, trials, or long travel.'
	}
];
