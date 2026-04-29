/** Paths that must stay global (no locale prefix). */
export function shouldSkipLocalePrefix(href: string): boolean {
	return (
		href.startsWith('/api') ||
		href.startsWith('/@') ||
		href.startsWith('/_') ||
		href.startsWith('//')
	);
}
