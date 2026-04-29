import type { RequestEvent } from '@sveltejs/kit';
import { getLocale, localizeHref, localizeUrl } from '@/shared/lib/paraglide/runtime';
import { shouldSkipLocalePrefix } from '@/shared/utils/paraglideHref';

/** Locales aligned with Paraglide `localizeHref` options. */
export type LocalizeHrefUiLocale = 'en' | 'de' | 'es';

/** `mailto:`, `https://`, in-page `#`, etc. — do not run through `localizeHref`. */
export function isOffSiteOrSpecialHref(href: string): boolean {
	return (
		href.startsWith('http://') ||
		href.startsWith('https://') ||
		href.startsWith('//') ||
		href.startsWith('mailto:') ||
		href.startsWith('tel:') ||
		href.startsWith('#') ||
		href.startsWith('javascript:')
	);
}

/**
 * Client-side `href` for `<a>`: Paraglide locale prefix on internal paths; passthrough for
 * {@link shouldSkipLocalePrefix}, {@link isOffSiteOrSpecialHref}, or empty input.
 */
export function localizeHrefForUi(
	href: string | null | undefined,
	options?: { locale?: LocalizeHrefUiLocale }
): string | undefined {
	if (href == null || href === '') return undefined;
	if (shouldSkipLocalePrefix(href) || isOffSiteOrSpecialHref(href)) return href;
	return localizeHref(href, options?.locale !== undefined ? { locale: options.locale } : undefined);
}

/** Canonical path (e.g. `/login`) translated to the active locale prefix (`/de/login` when locale is `de`). */
export function localizedPath(event: RequestEvent, canonicalPath: string) {
	const localized = localizeUrl(new URL(canonicalPath, event.url.origin).href, { locale: getLocale() });
	return `${localized.pathname}${localized.search}`;
}